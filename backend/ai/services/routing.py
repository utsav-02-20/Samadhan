import math
import logging
from typing import Dict, List, Optional, Tuple

try:
    from ..schemas.problem import ProblemAnalysis
    from ..schemas.university import (
        ScoreBreakdown,
        University,
        UniversityRecommendation,
        RoutingResponse,
    )
    from .university_data import get_universities
except (ImportError, ValueError):
    from schemas.problem import ProblemAnalysis
    from schemas.university import (
        ScoreBreakdown,
        University,
        UniversityRecommendation,
        RoutingResponse,
    )
    from services.university_data import get_universities

logger = logging.getLogger("samadhan_ai.routing")

# District approximate centroid coordinates in Jharkhand for offline Haversine distance
JHARKHAND_DISTRICT_COORDS: Dict[str, Tuple[float, float]] = {
    "Ranchi": (23.3441, 85.3096),
    "Gumla": (23.0427, 84.5414),
    "Dhanbad": (23.7957, 86.4304),
    "East Singhbhum": (22.8046, 86.2029),
    "West Singhbhum": (22.5539, 85.8116),
    "Bokaro": (23.6693, 86.1511),
    "Hazaribagh": (23.9925, 85.3637),
    "Deoghar": (24.4826, 86.7001),
    "Dumka": (24.2698, 87.2479),
    "Giridih": (24.1867, 86.3149),
    "Palamu": (24.0416, 84.0728),
    "Ramgarh": (23.6277, 85.5152),
    "Khunti": (23.0729, 85.2790),
    "Simdega": (22.6174, 84.5074),
    "Lohardaga": (23.4357, 84.6803),
    "Latehar": (23.7441, 84.5019),
    "Garhwa": (24.1611, 83.8058),
    "Chatra": (24.2120, 84.8711),
    "Koderma": (24.4697, 85.5947),
    "Jamtara": (23.9599, 86.8044),
    "Godda": (24.8267, 87.2132),
    "Sahibganj": (25.2425, 87.6416),
    "Pakur": (24.6340, 87.8488),
    "Saraikela Kharsawan": (22.7006, 85.9272),
}

# Domain relatedness / interdisciplinary fallback relationships
RELATED_DOMAINS_MAP: Dict[str, List[str]] = {
    "Agriculture": [
        "Forestry & Ecology", "Environmental Engineering", "Environmental Science",
        "Biotechnology", "Basic Sciences"
    ],
    "Water Resources": [
        "Environmental Engineering", "Civil Infrastructure", "Mining & Earth Sciences",
        "Environmental Science", "Mechanical Engineering"
    ],
    "Healthcare": [
        "Public Health", "Biomedical Sciences", "Biotechnology", "Basic Sciences"
    ],
    "Mining & Earth Sciences": [
        "Environmental Engineering", "Civil Infrastructure", "Water Resources", "Chemistry"
    ],
    "Renewable Energy": [
        "Electrical Engineering", "Civil Infrastructure", "Mechanical Engineering",
        "Computer Science & IT", "Electronics"
    ],
    "Civil Infrastructure": [
        "Mechanical Engineering", "Renewable Energy", "Environmental Engineering",
        "Materials Science"
    ],
    "Environmental Engineering": [
        "Water Resources", "Mining & Earth Sciences", "Civil Infrastructure",
        "Environmental Science", "Agriculture"
    ],
    "Computer Science & IT": [
        "Electronics", "Renewable Energy", "Civic Technology", "Biotechnology"
    ],
    "Basic Sciences": [
        "Biotechnology", "Environmental Science", "Healthcare", "Agriculture"
    ],
    "Civic Technology": [
        "Computer Science & IT", "Civil Infrastructure", "Environmental Science"
    ]
}


def _haversine_distance_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate the great-circle distance between two points in kilometers."""
    R = 6371.0  # Earth radius in kilometers
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c


def calculate_domain_match(problem_domain: str, problem_subdomain: str, uni_domains: List[str]) -> float:
    """
    1. Domain Match (50% weight in final score)
    - Exact match: 100
    - Related/partial/subdomain match: 60-80
    - No match: 0
    """
    if not problem_domain or not uni_domains:
        return 0.0

    p_domain_lower = problem_domain.strip().lower()
    p_subdomain_lower = problem_subdomain.strip().lower() if problem_subdomain else ""
    uni_domains_lower = [d.strip().lower() for d in uni_domains]

    # Rule 1: Exact domain match
    if p_domain_lower in uni_domains_lower:
        return 100.0

    # Rule 2: Subdomain explicitly matches a university domain
    if p_subdomain_lower and any(p_subdomain_lower == d or d in p_subdomain_lower for d in uni_domains_lower):
        return 80.0

    # Rule 3: Configured interdisciplinary related domain
    related = RELATED_DOMAINS_MAP.get(problem_domain, [])
    for r in related:
        if r.lower() in uni_domains_lower:
            return 75.0

    # Rule 4: Partial keyword match between problem domain/subdomain and university domains
    p_tokens = set(p_domain_lower.split() + p_subdomain_lower.split())
    # remove noise words
    p_tokens = {t for t in p_tokens if len(t) > 3 and t not in {"science", "engineering", "technology", "studies"}}
    for d in uni_domains_lower:
        d_tokens = set(d.split())
        if p_tokens.intersection(d_tokens):
            return 65.0

    return 0.0


def calculate_past_performance(problem_domain: str, past_perf) -> float:
    """
    2. Past Performance (30% weight in final score)
    - Preferably domain-specific success rate.
    - Fallback to overall institutional success rate.
    - Scale to 0-100.
    """
    if not past_perf:
        return 0.0

    domain_projects = past_perf.domain_projects or {}

    # Check for domain-specific project history
    if problem_domain in domain_projects:
        dp = domain_projects[problem_domain]
        if dp.completed > 0:
            return round(min(100.0, max(0.0, dp.success_rate * 100.0)), 2)

    # Also check case-insensitive match for domain_projects
    p_lower = problem_domain.strip().lower()
    for d_name, dp in domain_projects.items():
        if d_name.lower() == p_lower and dp.completed > 0:
            return round(min(100.0, max(0.0, dp.success_rate * 100.0)), 2)

    # Fallback to institutional overall success rate
    if past_perf.completed_projects > 0:
        return round(min(100.0, max(0.0, past_perf.success_rate * 100.0)), 2)

    return 0.0


def calculate_expertise_match(required_skills: List[str], uni_expertise: List[str]) -> float:
    """
    3. Expertise / Required Skills Match (15% weight in final score)
    - Normalized keyword overlap / Jaccard-style matching between required skills and university expertise.
    - Robust to casing, whitespace, and minor variations.
    """
    if not required_skills or not uni_expertise:
        return 0.0

    clean_skills = [s.strip().lower() for s in required_skills if s.strip()]
    clean_expertise = [e.strip().lower() for e in uni_expertise if e.strip()]

    if not clean_skills or not clean_expertise:
        return 0.0

    match_scores = []
    for skill in clean_skills:
        best_skill_score = 0.0
        s_tokens = set(skill.split())

        for exp in clean_expertise:
            # Exact match
            if skill == exp:
                best_skill_score = 1.0
                break
            # Substring containment
            elif skill in exp or exp in skill:
                best_skill_score = max(best_skill_score, 0.85)
            else:
                # Token overlap
                e_tokens = set(exp.split())
                overlap = s_tokens.intersection(e_tokens)
                if overlap:
                    ratio = len(overlap) / max(len(s_tokens), 1)
                    best_skill_score = max(best_skill_score, 0.70 * ratio)

        match_scores.append(best_skill_score)

    avg_coverage = sum(match_scores) / len(clean_skills)
    return round(min(100.0, max(0.0, avg_coverage * 100.0)), 2)


def calculate_geographic_proximity(
    problem_district: Optional[str],
    uni_district: str,
    uni_lat: float,
    uni_lon: float
) -> float:
    """
    4. Geographic Proximity (5% weight in final score)
    - Same district: 100
    - Nearby district (<80km): 70
    - Moderate distance (<180km): 40
    - Far (>180km): 10
    - Unknown location: 0
    """
    if not problem_district:
        return 0.0

    p_dist = problem_district.strip()
    u_dist = uni_district.strip()

    # Exact same district
    if p_dist.lower() == u_dist.lower():
        return 100.0

    # Calculate distance using coordinates if available
    p_coords = JHARKHAND_DISTRICT_COORDS.get(p_dist)
    if not p_coords and p_dist.title() in JHARKHAND_DISTRICT_COORDS:
        p_coords = JHARKHAND_DISTRICT_COORDS[p_dist.title()]

    if p_coords and uni_lat and uni_lon:
        dist_km = _haversine_distance_km(p_coords[0], p_coords[1], uni_lat, uni_lon)
        if dist_km <= 50.0:
            return 85.0
        elif dist_km <= 100.0:
            return 70.0
        elif dist_km <= 200.0:
            return 40.0
        else:
            return 10.0

    # If coordinates unavailable, fallback to default moderate distance score
    return 30.0


def generate_explanation(
    uni_name: str,
    domain_name: str,
    breakdown: ScoreBreakdown
) -> str:
    """
    Deterministically synthesize an explainable justification from score components.
    No LLM hallucinations.
    """
    parts = []

    # Domain part
    if breakdown.domain_match >= 100:
        parts.append(f"Strong direct domain match in {domain_name} ({breakdown.domain_match:.0f}/100)")
    elif breakdown.domain_match >= 60:
        parts.append(f"Relevant interdisciplinary capability in {domain_name} ({breakdown.domain_match:.0f}/100)")
    else:
        parts.append(f"No direct alignment with {domain_name} ({breakdown.domain_match:.0f}/100)")

    # Performance part
    if breakdown.past_performance >= 85:
        parts.append(f"high historical project success rate ({breakdown.past_performance:.1f}/100)")
    elif breakdown.past_performance >= 60:
        parts.append(f"solid historical project track record ({breakdown.past_performance:.1f}/100)")
    elif breakdown.past_performance > 0:
        parts.append(f"moderate past performance ({breakdown.past_performance:.1f}/100)")
    else:
        parts.append("no previous completed project data recorded")

    # Expertise part
    if breakdown.expertise_match >= 75:
        parts.append(f"excellent required skills overlap ({breakdown.expertise_match:.1f}/100)")
    elif breakdown.expertise_match >= 40:
        parts.append(f"partial technical expertise overlap ({breakdown.expertise_match:.1f}/100)")
    elif breakdown.expertise_match > 0:
        parts.append(f"minimal expertise match ({breakdown.expertise_match:.1f}/100)")

    # Geographic part
    if breakdown.geographic_proximity >= 100:
        parts.append("located in the same district (100/100)")
    elif breakdown.geographic_proximity >= 70:
        parts.append(f"close geographic proximity ({breakdown.geographic_proximity:.0f}/100)")
    elif breakdown.geographic_proximity >= 40:
        parts.append(f"moderate distance in Jharkhand ({breakdown.geographic_proximity:.0f}/100)")

    return ", ".join(parts) + "."


def route_problem(
    problem: ProblemAnalysis,
    universities: Optional[List[University]] = None,
    top_n: int = 3
) -> RoutingResponse:
    """
    Execute the deterministic university ranking algorithm.

    GATING RULE:
      University allocation happens ONLY when problem.is_rnd == True.
      If problem.is_rnd == False:
        - Do NOT calculate university scores.
        - Do NOT return a best_match.
        - Do NOT return university recommendations.
        - Return route_to_university=False with clear civic department dispatch reason.

    Formula (when is_rnd=True):
      Final Score = 0.50 * Domain Match + 0.30 * Past Performance + 0.15 * Expertise Match + 0.05 * Geographic Proximity
    
    Tie-breaking:
      1. Higher Domain Match
      2. Higher Past Performance
      3. Higher Expertise Match
      4. Alphabetical by university name
    """
    # -------------------------------------------------------------------------
    # UNIVERSITY ROUTING GATE: is_rnd MUST be True
    # -------------------------------------------------------------------------
    if not problem.is_rnd:
        logger.info(f"Problem is_rnd=False. Gating university allocation; routing to municipal/civic department.")
        return RoutingResponse(
            route_to_university=False,
            reason="Routine civic maintenance problem; university allocation is not required.",
            best_match=None,
            recommendations=[],
            total_evaluated=0,
        )

    unis = universities if universities is not None else get_universities()
    if not unis:
        logger.warning("Empty university dataset provided to router.")
        return RoutingResponse(
            route_to_university=True,
            reason="No universities available in knowledge base.",
            best_match=None,
            recommendations=[],
            total_evaluated=0,
        )

    evaluated: List[UniversityRecommendation] = []

    for uni in unis:
        # 1. Component calculations
        d_score = calculate_domain_match(problem.domain, problem.subdomain, uni.domains)
        p_score = calculate_past_performance(problem.domain, uni.past_performance)
        e_score = calculate_expertise_match(problem.required_skills, uni.expertise)
        g_score = calculate_geographic_proximity(problem.district, uni.district, uni.latitude, uni.longitude)

        # 2. Final weighted score (0-100)
        final_score = round(
            0.50 * d_score
            + 0.30 * p_score
            + 0.15 * e_score
            + 0.05 * g_score,
            2
        )

        breakdown = ScoreBreakdown(
            domain_match=round(d_score, 2),
            past_performance=round(p_score, 2),
            expertise_match=round(e_score, 2),
            geographic_proximity=round(g_score, 2),
            final_score=final_score,
        )

        reason = generate_explanation(uni.name, problem.domain, breakdown)

        evaluated.append(
            UniversityRecommendation(
                university_id=uni.id,
                university_name=uni.name,
                district=uni.district,
                city=uni.city,
                final_score=final_score,
                score_breakdown=breakdown,
                reason=reason,
            )
        )

    # 3. Deterministic Sort with Tie-Breaking
    evaluated.sort(
        key=lambda r: (
            -r.final_score,
            -r.score_breakdown.domain_match,
            -r.score_breakdown.past_performance,
            -r.score_breakdown.expertise_match,
            r.university_name
        )
    )

    best_match = evaluated[0] if evaluated else None
    recommendations = evaluated[:top_n]

    return RoutingResponse(
        route_to_university=True,
        reason=f"R&D challenge identified in {problem.domain}; top institutions recommended based on domain match and track record.",
        best_match=best_match,
        recommendations=recommendations,
        total_evaluated=len(evaluated),
    )

