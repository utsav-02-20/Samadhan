from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from config import is_gemini_configured, CLIENT_URL, CORS_ORIGIN
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

# Enable CORS for Next.js frontend and Node backend
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