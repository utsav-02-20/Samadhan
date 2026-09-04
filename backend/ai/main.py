from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from config import is_gemini_configured, CLIENT_URL, CORS_ORIGIN
from schemas.problem import ProblemAnalysis, ProblemClassifyRequest
from schemas.university import RoutingResponse, AnalyzeAndRouteResponse
from services.categorization import categorize_problem
from services.routing import route_problem
from services.university_data import get_universities

# Create app FIRST
app = FastAPI(
    title="Samadhan AI Service",
    description="AI problem categorization and deterministic university allocation engine for Samadhan-Setu.",
    version="1.0.0",
)

# CORS
origins = list(set([
    CLIENT_URL,
    CORS_ORIGIN,
    "http://localhost:3000",
    "http://localhost:5000",
]))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- ROUTES ----------------

@app.get("/")
def home():
    return {
        "service": "Samadhan AI Service",
        "status": "running",
        "gemini_configured": is_gemini_configured(),
    }

@app.post("/classify", response_model=ProblemAnalysis)
def classify_problem(request: ProblemClassifyRequest):
    return categorize_problem(request.problem)

@app.post("/route", response_model=RoutingResponse)
def route_to_university(analysis: ProblemAnalysis):
    return route_problem(analysis)

@app.post("/analyze-and-route", response_model=AnalyzeAndRouteResponse)
def analyze_and_route(request: ProblemClassifyRequest):
    analysis = categorize_problem(request.problem)
    routing = route_problem(analysis)
    return AnalyzeAndRouteResponse(
        analysis=analysis,
        routing=routing,
    )

@app.get("/universities")
def universities():
    return {"universities": get_universities()}