# Root endpoint
@app.get("/")
def home():
    return {
        "service": "Samadhan AI Service",
        "status": "running",
        "gemini_configured": is_gemini_configured(),
    }


# Categorize complaint
@app.post("/classify", response_model=ProblemAnalysis)
def classify_problem(request: ProblemClassifyRequest):
    try:
        return categorize_problem(request.problem)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Route complaint to universities
@app.post("/route", response_model=RoutingResponse)
def route_to_university(analysis: ProblemAnalysis):
    try:
        return route_problem(analysis)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Complete pipeline (Citizen → AI → Universities)
@app.post("/analyze-and-route", response_model=AnalyzeAndRouteResponse)
def analyze_and_route(request: ProblemClassifyRequest):
    try:
        analysis = categorize_problem(request.problem)
        routing = route_problem(analysis)

        return AnalyzeAndRouteResponse(
            analysis=analysis,
            routing=routing
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# List all universities
@app.get("/universities")
def universities():
    return {"universities": get_universities()}