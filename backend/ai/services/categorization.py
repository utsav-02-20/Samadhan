import json
import logging
import re
from typing import Optional, Union

try:
    from ..config import GEMINI_API_KEY, is_gemini_configured
    from ..schemas.problem import ProblemAnalysis, ProblemClassifyRequest
    from ..models.fast_category_engine import FastCategoryEngine
    from .sla_and_allocation import SLAAndAllocationEngine
except (ImportError, ValueError):
    from config import GEMINI_API_KEY, is_gemini_configured
    from schemas.problem import ProblemAnalysis, ProblemClassifyRequest
    from models.fast_category_engine import FastCategoryEngine
    from services.sla_and_allocation import SLAAndAllocationEngine

logger = logging.getLogger("samadhan_ai.categorization")

_ml_engine = None
_sla_engine = None

def get_ml_engine():
    global _ml_engine
    if _ml_engine is None:
        try:
            _ml_engine = FastCategoryEngine()
        except Exception as e:
            logger.warning(f"Could not load FastCategoryEngine: {e}")
    return _ml_engine

def get_sla_engine():
    global _sla_engine
    if _sla_engine is None:
        try:
            _sla_engine = SLAAndAllocationEngine()
        except Exception as e:
            logger.warning(f"Could not load SLAAndAllocationEngine: {e}")
    return _sla_engine

# Jharkhand 24 districts for normalization
JHARKHAND_DISTRICTS = [
    "Garhwa", "Palamu", "Chatra", "Hazaribagh", "Koderma", "Giridih",
    "Ramgarh", "Bokaro", "Dhanbad", "Lohardaga", "Gumla", "Simdega",
    "Ranchi", "Khunti", "West Singhbhum", "Saraikela Kharsawan", "East Singhbhum",
    "Jamtara", "Deoghar", "Dumka", "Pakur", "Godda", "Sahibganj", "Latehar"
]


def _extract_district_from_text(text: str, default_district: Optional[str] = None) -> Optional[str]:
    """Scan text for any mentioned Jharkhand district."""
    if default_district:
        for d in JHARKHAND_DISTRICTS:
            if d.lower() == default_district.strip().lower():
                return d
    for d in JHARKHAND_DISTRICTS:
        pattern = rf"\b{re.escape(d)}\b"
        if re.search(pattern, text, re.IGNORECASE):
            return d
    # Special common aliases
    if re.search(r"\bJamshedpur\b", text, re.IGNORECASE):
        return "East Singhbhum"
    if re.search(r"\bChaibasa\b", text, re.IGNORECASE):
        return "West Singhbhum"
    if re.search(r"\bMedininagar\b|\bDaltonganj\b", text, re.IGNORECASE):
        return "Palamu"
    return default_district


def _deterministic_fallback(text: str, default_district: Optional[str] = None) -> ProblemAnalysis:
    """
    Deterministic rule-based categorization used exclusively for offline testing,
    mock demonstrations, or when Gemini API is inaccessible.
    """
    text_lower = text.lower()
    district = _extract_district_from_text(text, default_district)

    # -------------------------------------------------------------------------
    # 1. R&D vs Routine Civic Maintenance Classification
    # -------------------------------------------------------------------------
    # Patterns indicating genuine technological development, research, AI, IoT, or prototyping
    rnd_tech_patterns = [
        # AI / Machine Learning / Computer Vision
        r"\b(?:ai|artificial intelligence|machine learning|deep learning|computer vision|neural net\w*|image recognition|yolo)\b",
        r"\b(?:ai[- ]based|ml[- ]based|data[- ]driven)\b",
        # IoT / Smart Sensors / Automation
        r"\b(?:iot|internet of things|sensor[- ]based|wireless sensor|embedded system)\b",
        r"\b(?:smart|intelligent)\s+(?:street\s?light|traffic|monitoring|lighting|irrigation|grid|surveillance|sensor|signal|drainage|pump|infrastructure|system)\b",
        r"\b(?:pump|drainage|traffic|industrial|grid)\s+automation\b",
        r"\bpredictive maintenance\b",
        # Development / Building / Prototyping a technological solution
        r"\b(?:develop|build|design|create|engineer|prototype|train|invent)\w*\s+(?:an?\s+)?(?:ai|iot|smart|automated|sensor|software|hardware|algorithm|model|system|platform|device|kit|mechanism|tool)\b",
        r"\b(?:automated|automatic)\s+(?:detection|monitoring|classification|diagnosis|surveillance|testing|optimization|early warning|control|pumping)\b",
        r"\b(?:low[- ]cost|low cost)\s+(?:system|device|sensor|kit|mechanism|prototype|technology)\b",
        # Scientific / Research inquiry
        r"\b(?:soil|crop|groundwater|drinking water|air)\s+(?:testing|monitoring|analysis|purification)\s+(?:system|device|technology|kit)\b",
        r"\b(?:heavy metal|arsenic|fluoride|lead|contamination)\s+(?:detection|monitoring|remediation|sensor)\b",
        r"\b(?:disease|epidemic)\s+(?:surveillance|detection|telemedicine|early diagnosis)\b",
    ]

    # Patterns indicating routine civic maintenance (repair, replacement, cleaning, filling, collecting)
    routine_civic_patterns = [
        # Street light & bulb repairs/replacements
        r"\b(?:street\s?light|bulb|lamp|pole|tube\s?light)\b.*?\b(?:replac\w*|fused|not\s+(?:working|glowing|functional)|broken|repair\w*|fix\w*|change\w*|faulty|damaged|off)\b",
        r"\b(?:replac\w*|repair\w*|fix\w*|change\w*)\b.*?\b(?:street\s?light|bulb|lamp|pole|tube\s?light)\b",
        r"\b(?:fused|broken|damaged|faulty)\s+(?:bulb|street\s?light|lamp)\b",
        r"\b(?:bulb|street\s?light)\s+replacement\b",
        r"\b(?:street\s?light|bulb)\s+(?:is\s+)?(?:not\s+working|broken|fused)\b",
        # Potholes & road surface repairs
        r"\b(?:pothole\w*|road|pavement|lane|street|highway)\b.*?\b(?:repair\w*|fix\w*|patch\w*|fill\w*|damag\w*|broken|resurfac\w*|reconstruct\w*)\b",
        r"\b(?:repair\w*|fix\w*|patch\w*|fill\w*)\b.*?\b(?:pothole\w*|road|pavement|lane)\b",
        r"\b(?:damaged|broken|cracked)\s+road\b",
        r"\b(?:large\s+)?pothole\w*\s+(?:needs|on|in|damaged)\b",
        r"\bpothole\w*\b",
        # Garbage, trash, waste collection
        r"\b(?:garbage|trash|waste|litter|dustbin|bin|dumpster)\b.*?\b(?:collect\w*|clear\w*|clean\w*|pick\s?up|dump\w*|overflow\w*|pile\w*|stink\w*|not\s+happening|not\s+collected|removal)\b",
        r"\b(?:collect\w*|clear\w*|clean\w*|empty\w*|remove\w*)\b.*?\b(?:garbage|trash|waste|dustbin|bin)\b",
        r"\bgarbage\s+collection\s+is\s+not\s+happening\b",
        # Drainage & pipeline leaks / clogs
        r"\b(?:drain\w*|gutter\w*|sewer\w*|pipeline\w*|pipe\w*|tap\w*)\b.*?\b(?:block\w*|clog\w*|chok\w*|leak\w*|clean\w*|clear\w*|repair\w*|fix\w*|burst\w*|dripping)\b",
        r"\b(?:clear\w*|clean\w*|unblock\w*|repair\w*|fix\w*)\b.*?\b(?:drain\w*|gutter\w*|sewer\w*|pipe\w*|pipeline\w*|tap\w*)\b",
        r"\b(?:leaking|dripping)\s+tap\b",
        r"\b(?:blocked|choked|clogged)\s+(?:drain|sewer|gutter)\b",
    ]

    has_explicit_rnd = any(re.search(pat, text_lower) for pat in rnd_tech_patterns)
    has_routine_civic = any(re.search(pat, text_lower) for pat in routine_civic_patterns)

    # Core gating distinction:
    # 1. Explicit R&D development (e.g. AI pothole detection, IoT streetlight monitoring) -> True
    # 2. Routine civic maintenance/complaint -> False
    # 3. Default to False unless explicit research/scientific problem is present
    if has_explicit_rnd:
        is_rnd = True
    elif has_routine_civic:
        is_rnd = False
    else:
        # Check scientific research problem indicators
        scientific_indicators = ["research", "experiment", "soil fertility", "groundwater contamination", "heavy metal", "disease surveillance"]
        is_rnd = any(ind in text_lower for ind in scientific_indicators)

    # -------------------------------------------------------------------------
    # 2. Domain & Subdomain Mapping
    # -------------------------------------------------------------------------
    if any(k in text_lower for k in ["soil", "crop", "farmer", "agriculture", "fertilizer", "yield", "farming", "paddy", "wheat", "irrigation"]):
        domain = "Agriculture"
        if "soil" in text_lower or "fertile" in text_lower or "fertility" in text_lower:
            subdomain = "Soil Science"
            skills = ["Soil Testing", "Agricultural Engineering", "Data Analysis", "Agronomy"]
        elif "irrigation" in text_lower or "water" in text_lower:
            subdomain = "Agricultural Water Management"
            skills = ["Irrigation Engineering", "Hydrology", "IoT", "Sensors"]
        else:
            subdomain = "Smart Agriculture"
            skills = ["Agricultural Engineering", "Crop Science", "Data Analysis"]

    elif any(k in text_lower for k in ["water", "groundwater", "contamination", "arsenic", "fluoride", "drinking water", "borewell", "aquifer", "purification", "tap"]):
        domain = "Water Resources"
        if not is_rnd and any(k in text_lower for k in ["tap", "pipe", "leak", "pipeline"]):
            subdomain = "Water Supply Maintenance"
            skills = ["Plumbing", "Pipeline Maintenance", "Municipal Services"]
        elif "contamination" in text_lower or "quality" in text_lower or "arsenic" in text_lower or "fluoride" in text_lower or "pollut" in text_lower:
            subdomain = "Groundwater & Water Quality"
            skills = ["Environmental Engineering", "Water Quality Analysis", "Chemical Sensors", "Hydrology"]
        else:
            subdomain = "Water Supply & Conservation"
            skills = ["Civil Engineering", "Water Resource Management", "Hydraulic Systems"]

    elif any(k in text_lower for k in ["health", "disease", "patient", "hospital", "clinic", "medical", "infection", "doctor", "malnutrition", "epidemic"]):
        domain = "Healthcare"
        if "ai" in text_lower or "detect" in text_lower or "software" in text_lower or "telemedicine" in text_lower:
            subdomain = "Medical Technology & AI"
            skills = ["Biomedical Engineering", "Machine Learning", "Health Informatics", "Data Analysis"]
        else:
            subdomain = "Public Health"
            skills = ["Epidemiology", "Public Health Administration", "Community Medicine"]

    elif any(k in text_lower for k in ["solar", "electricity", "power", "energy", "grid", "battery", "renewable"]):
        domain = "Renewable Energy"
        subdomain = "Solar & Power Systems"
        skills = ["Electrical Engineering", "Solar Photovoltaics", "Power Systems", "Embedded Systems"]

    elif any(k in text_lower for k in ["mining", "mine", "coal", "blast", "subsidence", "quarry"]):
        domain = "Mining & Earth Sciences"
        subdomain = "Mining Safety & Environmental Impact"
        skills = ["Mining Engineering", "Geotechnical Engineering", "Environmental Monitoring", "Remote Sensing"]

    elif any(k in text_lower for k in ["waste", "garbage", "trash", "plastic", "recycl", "landfill", "sanitation", "drainage", "drain", "sewage", "sewer"]):
        domain = "Environmental Engineering"
        if not is_rnd:
            subdomain = "Municipal Waste Collection & Sanitation"
            skills = ["Waste Collection", "Sanitation Services", "Municipal Operations"]
        else:
            subdomain = "Waste Management & Sanitation"
            skills = ["Environmental Engineering", "Waste Processing", "Bio-remediation", "IoT Sensors"]

    elif any(k in text_lower for k in ["road", "traffic", "bridge", "pothole", "transport", "street light", "streetlight", "bulb"]):
        domain = "Civil Infrastructure"
        if any(k in text_lower for k in ["street light", "streetlight", "bulb"]):
            if is_rnd:
                subdomain = "Smart Lighting & IoT Systems"
                skills = ["IoT", "Embedded Systems", "Electrical Engineering", "Sensor Networks"]
            else:
                subdomain = "Street Lighting Maintenance"
                skills = ["Electrical Maintenance", "Street Light Repair", "Municipal Operations"]
        elif any(k in text_lower for k in ["pothole", "road", "pavement"]):
            if is_rnd:
                subdomain = "Automated Road Inspection & Smart Systems"
                skills = ["Computer Vision", "Machine Learning", "Civil Engineering", "Sensor Networks"]
            else:
                subdomain = "Road Maintenance"
                skills = ["Road Maintenance", "Asphalt Patching", "Civil Engineering"]
        elif "traffic" in text_lower:
            subdomain = "Intelligent Transportation Systems"
            skills = ["Traffic Engineering", "Optimization Algorithms", "Smart City Systems"]
        else:
            subdomain = "Transportation & Public Infrastructure"
            skills = ["Civil Engineering", "Structural Analysis", "Urban Planning"]

    else:
        domain = "Civic Technology"
        subdomain = "Public Systems Engineering"
        skills = ["Information Technology", "Data Analytics", "Systems Engineering"]

    # -------------------------------------------------------------------------
    # 3. Severity Detection
    # -------------------------------------------------------------------------
    if any(k in text_lower for k in ["fatal", "death", "epidemic", "poison", "crisis", "disaster", "severe illness"]):
        severity = "Critical"
    elif any(k in text_lower for k in ["urgent", "declin", "hazard", "acute", "contamination", "danger", "failing", "less fertile", "immediate"]):
        severity = "High"
    elif any(k in text_lower for k in ["minor", "slow", "fused", "routine", "cosmetic", "small"]):
        severity = "Low"
    else:
        severity = "Medium"

    # ML and SLA Model Predictions
    ml = get_ml_engine()
    sla_eng = get_sla_engine()

    ml_parent_code = None
    ml_fine_code = None
    ml_dept = None
    ml_conf = None
    predicted_days = 15
    deadline = None
    priority = "NORMAL"

    if ml is not None:
        try:
            pred = ml.predict(text)
            if pred.get("status") == "success":
                if domain == "Other" or not domain:
                    domain = pred.get("parent_category_name", domain)
                if subdomain == "General Civic Issue" or not subdomain:
                    subdomain = pred.get("fine_category_name", subdomain)
                ml_parent_code = pred.get("parent_category_code")
                ml_fine_code = pred.get("fine_category_code")
                ml_dept = pred.get("org_name")
                ml_conf = pred.get("parent_confidence")
        except Exception as e:
            logger.debug(f"ML predict fallback warning: {e}")

    if sla_eng is not None:
        try:
            sla_info = sla_eng.predict_sla(text, parent_code=ml_parent_code, fine_code=ml_fine_code, district=district)
            predicted_days = sla_info.get("predicted_resolution_days", 15)
            deadline = sla_info.get("expected_deadline")
            priority = sla_info.get("priority", "NORMAL")
            if priority == "CRITICAL":
                severity = "Critical"
            elif priority == "HIGH" and severity != "Critical":
                severity = "High"
        except Exception:
            pass

    return ProblemAnalysis(
        domain=domain,
        subdomain=subdomain,
        required_skills=skills,
        district=district,
        severity=severity,
        is_rnd=is_rnd,
        parent_category_code=ml_parent_code,
        fine_category_code=ml_fine_code,
        department=ml_dept,
        confidence=ml_conf,
        predicted_resolution_days=predicted_days,
        expected_deadline=deadline,
        priority=priority
    )


def _clean_json_text(raw_text: str) -> str:
    """Extract and sanitize JSON from LLM response text."""
    text = raw_text.strip()
    if "```" in text:
        match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", text, re.IGNORECASE)
        if match:
            text = match.group(1).strip()
    first_brace = text.find("{")
    last_brace = text.rfind("}")
    if first_brace != -1 and last_brace != -1 and last_brace > first_brace:
        text = text[first_brace:last_brace + 1]
    return text


def _classify_with_gemini(text: str, default_district: Optional[str] = None) -> ProblemAnalysis:
    """Call Google Gemini API to produce structured problem analysis."""
    import google.generativeai as genai

    genai.configure(api_key=GEMINI_API_KEY)

    system_instruction = (
        "You are the AI Problem Categorization Engine for Samadhan, a governance and higher education platform in Jharkhand, India. "
        "Your role is to understand citizen-reported problems and extract structured technical parameters for university and department routing.\n\n"
        "Rules for classification:\n"
        "1. 'domain': Primary academic/technological discipline (e.g. Agriculture, Water Resources, Healthcare, Renewable Energy, Environmental Engineering, Civil Infrastructure, Mining & Earth Sciences, Computer Science & IT).\n"
        "2. 'subdomain': Specific technological or scientific niche (e.g. Soil Science, Groundwater Monitoring, AI Medical Diagnosis, Solar Microgrids, Solid Waste Management, Street Lighting Maintenance, Road Maintenance).\n"
        "3. 'required_skills': Array of 2 to 5 relevant technical/research skills or operational capabilities needed to address the problem.\n"
        "4. 'district': The district in Jharkhand where the issue occurs (e.g. Ranchi, Gumla, Dhanbad, East Singhbhum, Bokaro, etc.). Extract from the text if mentioned; otherwise null.\n"
        "5. 'severity': One of 'Low', 'Medium', 'High', 'Critical' based on the human/economic impact described.\n"
        "6. 'is_rnd': Boolean flag (CRITICAL):\n"
        "   - Set is_rnd to FALSE for any routine civic service, physical repair, municipal maintenance, or ordinary citizen complaint.\n"
        "     Examples of FALSE (is_rnd=false):\n"
        "     * 'The street light bulb needs to be replaced', 'The street light is not working', 'Replace the fused street light bulb', 'Repair the broken street light'\n"
        "     * 'Fix the pothole on the road', 'Repair the damaged road', 'Large pothole needs immediate repair'\n"
        "     * 'Garbage needs to be collected', 'Garbage collection is not happening', 'Overflowing garbage bin'\n"
        "     * 'Clear the blocked drain', 'Repair the leaking tap', 'Choked sewer pipeline'\n"
        "     NOTE: Incidental presence of words like 'system', 'model', 'analysis', or 'automatic' in a routine maintenance context does NOT make it R&D.\n"
        "   - Set is_rnd to TRUE ONLY if the problem requires technological research, software/hardware development, innovative prototyping, AI, IoT, sensors, or scientific experimentation suitable for university researchers.\n"
        "     Examples of TRUE (is_rnd=true):\n"
        "     * 'Develop an AI system to automatically detect potholes using cameras'\n"
        "     * 'Build an IoT-based smart streetlight monitoring system'\n"
        "     * 'Develop a predictive maintenance system for streetlights'\n"
        "     * 'Create an intelligent traffic signal optimization system'\n"
        "     * 'Develop a sensor-based groundwater contamination monitoring system'\n"
        "     * 'Farmers in Gumla facing declining soil fertility needing a low-cost testing and crop advisory system'\n\n"
        "Return ONLY a valid, parseable JSON object with no commentary or additional formatting."
    )

    prompt = f"{system_instruction}\n\nProblem text:\n\"\"\"{text}\"\"\"\n\nProvide the JSON:"

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(
        prompt,
        generation_config=genai.types.GenerationConfig(
            temperature=0.1,
            max_output_tokens=500,
        )
    )

    if not response or not response.text:
        raise ValueError("Empty response received from Gemini API.")

    cleaned_json = _clean_json_text(response.text)
    data = json.loads(cleaned_json)

    # Ensure district fallback if LLM omitted it but text mentions it
    if not data.get("district"):
        detected_district = _extract_district_from_text(text, default_district)
        if detected_district:
            data["district"] = detected_district

    return ProblemAnalysis(**data)


def categorize_problem(request_or_text: Union[ProblemClassifyRequest, str, dict]) -> ProblemAnalysis:
    """
    Categorize an unstructured citizen problem into structured parameters.
    
    Uses Gemini API when configured; gracefully falls back to deterministic rule-based
    analysis for offline testing, missing API key, network failure, or malformed LLM responses.
    """
    # 1. Normalize input
    if isinstance(request_or_text, ProblemClassifyRequest):
        text = request_or_text.get_full_text()
        default_district = request_or_text.district
    elif isinstance(request_or_text, dict):
        req = ProblemClassifyRequest(**request_or_text)
        text = req.get_full_text()
        default_district = req.district
    else:
        text = str(request_or_text).strip()
        default_district = None

    if not text:
        raise ValueError("Problem text cannot be empty.")

    # 2. Attempt Gemini Classification if configured
    if is_gemini_configured():
        try:
            logger.info("Classifying problem using Gemini API...")
            return _classify_with_gemini(text, default_district=default_district)
        except Exception as e:
            logger.warning(f"Gemini classification failed ({type(e).__name__}: {e}). Using deterministic fallback.")
            return _deterministic_fallback(text, default_district=default_district)
    else:
        logger.info("GEMINI_API_KEY not configured. Using deterministic fallback for offline testing.")
        return _deterministic_fallback(text, default_district=default_district)
