"""
====================================================================
SAMADHAN SETU AI - INTEGRATED SERVICE (FASTAPI)
====================================================================
Production-grade AI problem categorization, CPGRAMS fine subcategory
mapping, dynamic SLA prediction, department allocation, and 
deterministic university R&D routing.
====================================================================
"""

import os
from typing import Dict, Any, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from config import is_gemini_configured, CLIENT_URL, CORS_ORIGIN, PORT
from schemas.problem import ProblemAnalysis, ProblemClassifyRequest
from schemas.university import RoutingResponse, AnalyzeAndRouteResponse, University
from services.categorization import categorize_problem
from services.routing import route_problem
from services.university_data import get_universities
from services.sla_and_allocation import SLAAndAllocationEngine
from models.fast_category_engine import FastCategoryEngine

app = FastAPI(
    title="Samadhan Setu AI Service",
    description="High-performance citizen grievance categorization, SLA estimation, department allocation, and university R&D routing.",
    version="2.0.0",
)

# Initialize engines
sla_engine = SLAAndAllocationEngine()
category_engine = None
try:
    category_engine = FastCategoryEngine()
except Exception as e:
    print(f"[Warn] FastCategoryEngine lazy load note: {e}")

# Enable CORS for Next.js frontend and Node backend
origins = list(set([
    CLIENT_URL,
    CORS_ORIGIN,
    "http://localhost:3000",
    "http://localhost:5000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5000",
    "*",
]))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GrievanceDirectRequest(BaseModel):
    complaint_text: str
    location: str = ""
    received_date: str = ""

@app.get("/")
async def root():
    return {
        "message": "Samadhan AI is running!",
        "status": "healthy",
        "service": "Samadhan Setu AI",
        "version": "2.0.0",
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "mode": "hybrid" if is_gemini_configured() else "deterministic_ml",
        "service": "Samadhan Setu AI",
        "version": "2.0.0",
        "gemini_configured": is_gemini_configured(),
        "fast_category_engine": category_engine is not None,
        "sla_model_loaded": sla_engine.sla_model is not None,
    }

@app.get("/api/v1/ai/universities", response_model=List[University])
@app.get("/api/v1/universities", response_model=List[University])
@app.get("/universities", response_model=List[University])
async def list_universities():
    """Retrieve full directory of Jharkhand universities and research centers."""
    return get_universities()

@app.post("/api/v1/ai/classify", response_model=ProblemAnalysis)
@app.post("/api/v1/classify", response_model=ProblemAnalysis)
@app.post("/classify", response_model=ProblemAnalysis)
async def classify_endpoint(req: ProblemClassifyRequest):
    """Categorize problem, extract skills, severity, R&D tag, and ML subcategory."""
    try:
        analysis = categorize_problem(req)
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/ai/recommend-universities", response_model=RoutingResponse)
@app.post("/api/v1/recommend-universities", response_model=RoutingResponse)
@app.post("/recommend-universities", response_model=RoutingResponse)
async def recommend_universities_endpoint(req: ProblemClassifyRequest):
    """Analyze and route directly to universities."""
    try:
        analysis = categorize_problem(req)
        return route_problem(analysis)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/ai/route", response_model=RoutingResponse)
@app.post("/api/v1/route", response_model=RoutingResponse)
@app.post("/route", response_model=RoutingResponse)
async def route_endpoint(analysis: ProblemAnalysis):
    """Deterministically route an analyzed problem to the best matching university."""
    try:
        routing = route_problem(analysis)
        return routing
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/ai/analyze-and-route", response_model=AnalyzeAndRouteResponse)
@app.post("/api/v1/analyze-and-route", response_model=AnalyzeAndRouteResponse)
@app.post("/analyze-and-route", response_model=AnalyzeAndRouteResponse)
async def analyze_and_route(req: ProblemClassifyRequest):
    """
    End-to-end AI intelligence:
    1. Categorizes problem (FastCategoryEngine ML + SLA + CPGRAMS mapping).
    2. If R&D innovation needed, routes to the top Jharkhand universities.
    3. If routine civic maintenance, specifies appropriate municipal/central department.
    """
    try:
        analysis = categorize_problem(req)
        routing = route_problem(analysis)

        # Department allocation metadata
        dept_info = sla_engine.allocate_department(
            parent_code=analysis.parent_category_code,
            fine_code=analysis.fine_category_code,
            fallback_org=analysis.department or "GOV"
        )

        analysis_dict = analysis.model_dump()
        analysis_dict["department_allocation"] = dept_info

        return AnalyzeAndRouteResponse(
            analysis=analysis_dict,
            route_to_university=routing.route_to_university,
            reason=routing.reason,
            best_match=routing.best_match,
            recommendations=routing.recommendations
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/predict")
@app.post("/predict")
async def direct_predict(req: GrievanceDirectRequest):
    """
    Direct endpoint for citizen grievance analysis compatible with SamadhanSetuAI pipeline.
    """
    text = req.complaint_text
    location = req.location or "General Locality"

    # Category prediction
    cat_pred = {
        "parent_category_code": "619",
        "parent_category_name": "General Civic Infrastructure",
        "parent_confidence": 0.90,
        "fine_category_code": "637",
        "fine_category_name": "General Maintenance",
        "fine_confidence": 0.85,
        "org_code": "GOV",
        "org_name": "Government Administration",
        "status": "heuristic"
    }

    if category_engine is not None:
        try:
            p = category_engine.predict(text)
            if p.get("status") == "success":
                cat_pred = p
        except Exception:
            pass

    # SLA Prediction
    sla_info = sla_engine.predict_sla(
        text=text,
        parent_code=cat_pred.get("parent_category_code"),
        fine_code=cat_pred.get("fine_category_code"),
        district=location
    )

    # Department Allocation
    dept_info = sla_engine.allocate_department(
        parent_code=cat_pred.get("parent_category_code"),
        fine_code=cat_pred.get("fine_category_code"),
        fallback_org=cat_pred.get("org_code")
    )

    return {
        "complaint": text,
        "location": location,
        "category": {
            "level_1_category": cat_pred.get("parent_category_code"),
            "level_1_name": cat_pred.get("parent_category_name"),
            "fine_category": cat_pred.get("fine_category_code"),
            "fine_category_name": cat_pred.get("fine_category_name"),
            "confidence": cat_pred.get("parent_confidence"),
        },
        "sla": sla_info,
        "allocation": dept_info,
        "status": "success"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=False)