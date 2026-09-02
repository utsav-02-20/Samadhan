try:
    from .problem import ProblemAnalysis, ProblemClassifyRequest
    from .university import (
        DomainPerformance,
        PastPerformance,
        University,
        ScoreBreakdown,
        UniversityRecommendation,
        RoutingResponse,
        AnalyzeAndRouteResponse,
    )
except ImportError:
    from problem import ProblemAnalysis, ProblemClassifyRequest
    from university import (
        DomainPerformance,
        PastPerformance,
        University,
        ScoreBreakdown,
        UniversityRecommendation,
        RoutingResponse,
        AnalyzeAndRouteResponse,
    )

__all__ = [
    "ProblemAnalysis",
    "ProblemClassifyRequest",
    "DomainPerformance",
    "PastPerformance",
    "University",
    "ScoreBreakdown",
    "UniversityRecommendation",
    "RoutingResponse",
    "AnalyzeAndRouteResponse",
]
