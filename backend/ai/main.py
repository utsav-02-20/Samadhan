from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from config import is_gemini_configured
from schemas.problem import ProblemAnalysis, ProblemClassifyRequest
from schemas.university import RoutingResponse, AnalyzeAndRouteResponse
from services.categorization import categorize_problem
from services.routing import route_problem
from services.university_data import get_universities

app = FastAPI(
    title="Samadhan AI Service",
    description="AI problem categorization and deterministic university allocation engine for Samadhan-Setu.",
    version="1.0.0",
)

# Enable CORS for local Node.js backend and Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    """Root endpoint verifying service status."""
    return {"message": "Samadhan AI is running!"}


@app.get("/health")
def health():
    """Health check endpoint indicating service mode, status, and dataset size."""
    try:
        unis = get_universities()
        uni_count = len(unis)
    except Exception:
        uni_count = 0

    return {
        "status": "healthy",
        "service": "Samadhan AI Service",
        "version": "1.0.0",
        "gemini_configured": is_gemini_configured(),
        "mode": "gemini_live" if is_gemini_configured() else "deterministic_fallback",
        "universities_loaded": uni_count,
    }


@app.post("/api/v1/ai/classify", response_model=ProblemAnalysis)
def classify_endpoint(request: ProblemClassifyRequest):
    """
    Classify an unstructured citizen problem into structured parameters:
    - domain
    - subdomain
    - required_skills
    - district
    - severity
    - is_rnd
    """
    try:
        analysis = categorize_problem(request)
        return analysis
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Categorization error: {str(e)}")


@app.post("/api/v1/ai/recommend-universities", response_model=RoutingResponse)
def recommend_universities_endpoint(request: ProblemClassifyRequest):
    """
    Two-stage pipeline:
    1. Categorize problem using LLM (domain, skills, severity, is_rnd).
    2. Deterministically rank universities based on:
       - 50% Domain Match
       - 30% Past Performance
       - 15% Expertise / Skills Match
       - 5% Geographic Proximity
    """
    try:
        analysis = categorize_problem(request)
        routing_result = route_problem(analysis)
        return routing_result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Routing error: {str(e)}")


@app.post("/api/v1/ai/analyze-and-route", response_model=AnalyzeAndRouteResponse)
def analyze_and_route_endpoint(request: ProblemClassifyRequest):
    """
    Combined orchestration endpoint:
    Returns both the structured problem analysis and the ranked university recommendations.
    """
    try:
        analysis = categorize_problem(request)
        routing_result = route_problem(analysis)
        return AnalyzeAndRouteResponse(
            analysis=analysis.model_dump(),
            route_to_university=routing_result.route_to_university,
            reason=routing_result.reason,
            best_match=routing_result.best_match,
            recommendations=routing_result.recommendations,
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Orchestration error: {str(e)}")