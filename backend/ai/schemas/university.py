from typing import Dict, List, Optional
from pydantic import BaseModel, Field, field_validator


class DomainPerformance(BaseModel):
    """Performance metrics for a specific domain within an institution."""
    completed: int = Field(default=0, ge=0, description="Total completed projects in domain.")
    successful: int = Field(default=0, ge=0, description="Total successful projects in domain.")
    success_rate: float = Field(default=0.0, ge=0.0, le=1.0, description="Success rate between 0.0 and 1.0.")

    @field_validator("success_rate", mode="before")
    @classmethod
    def validate_rate(cls, value):
        if value is None:
            return 0.0
        v = float(value)
        if v > 1.0:
            v = v / 100.0
        return max(0.0, min(1.0, v))


class PastPerformance(BaseModel):
    """Institutional past performance record."""
    completed_projects: int = Field(default=0, ge=0, description="Overall completed projects.")
    successful_projects: int = Field(default=0, ge=0, description="Overall successful projects.")
    success_rate: float = Field(default=0.0, ge=0.0, le=1.0, description="Overall success rate between 0.0 and 1.0.")
    domain_projects: Dict[str, DomainPerformance] = Field(
        default_factory=dict,
        description="Domain-specific project metrics."
    )

    @field_validator("success_rate", mode="before")
    @classmethod
    def validate_rate(cls, value):
        if value is None:
            return 0.0
        v = float(value)
        if v > 1.0:
            v = v / 100.0
        return max(0.0, min(1.0, v))


class University(BaseModel):
    """University profile and capabilities in the Knowledge Base."""
    id: str = Field(..., description="Unique university identifier (slug).")
    name: str = Field(..., description="Full official university name.")
    district: str = Field(..., description="District location in Jharkhand.")
    city: str = Field(..., description="City location.")
    latitude: float = Field(default=0.0, description="GPS latitude coordinate.")
    longitude: float = Field(default=0.0, description="GPS longitude coordinate.")
    domains: List[str] = Field(default_factory=list, description="Academic and research domains.")
    expertise: List[str] = Field(default_factory=list, description="Specific skills and technical expertise areas.")
    past_performance: PastPerformance = Field(default_factory=PastPerformance, description="Historical performance metrics.")
    demo_data: bool = Field(default=True, alias="_demo_data", description="Indicates whether performance stats are demo placeholders.")
    note: Optional[str] = Field(default=None, alias="_note", description="Data integrity note.")

    class Config:
        populate_by_name = True


class ScoreBreakdown(BaseModel):
    """Detailed breakdown of allocation score components (each normalized 0-100)."""
    domain_match: float = Field(..., ge=0.0, le=100.0, description="Domain and subdomain match score (50% weight).")
    past_performance: float = Field(..., ge=0.0, le=100.0, description="Past project performance score (30% weight).")
    expertise_match: float = Field(..., ge=0.0, le=100.0, description="Required skills / expertise overlap score (15% weight).")
    geographic_proximity: float = Field(..., ge=0.0, le=100.0, description="Geographic proximity score (5% weight).")
    final_score: float = Field(..., ge=0.0, le=100.0, description="Weighted composite score (0-100).")


class UniversityRecommendation(BaseModel):
    """Ranked university recommendation with explainable reasoning."""
    university_id: str = Field(..., description="University unique identifier.")
    university_name: str = Field(..., description="University full name.")
    district: str = Field(..., description="University district.")
    city: str = Field(..., description="University city.")
    final_score: float = Field(..., description="Final allocation score (0-100).")
    score_breakdown: ScoreBreakdown = Field(..., description="Component scores breakdown.")
    reason: str = Field(..., description="Deterministic, explainable rationale for this recommendation.")


class RoutingResponse(BaseModel):
    """Response model for university routing/recommendation."""
    route_to_university: bool = Field(default=True, description="Whether problem was gated for university allocation (true only if is_rnd=true).")
    reason: Optional[str] = Field(default=None, description="Routing rationale, e.g. for civic department dispatch.")
    best_match: Optional[UniversityRecommendation] = Field(None, description="Top ranked university candidate.")
    recommendations: List[UniversityRecommendation] = Field(default_factory=list, description="Top ranked university recommendations.")
    total_evaluated: int = Field(default=0, description="Total number of universities evaluated.")


class AnalyzeAndRouteResponse(BaseModel):
    """Combined response model containing structured analysis and top recommendations."""
    analysis: dict = Field(..., description="Structured problem categorization produced by Gemini / categorization engine.")
    route_to_university: bool = Field(default=True, description="Whether problem was gated for university allocation.")
    reason: Optional[str] = Field(default=None, description="Routing rationale or department dispatch note.")
    best_match: Optional[UniversityRecommendation] = Field(None, description="Best candidate university (None if route_to_university=False).")
    recommendations: List[UniversityRecommendation] = Field(default_factory=list, description="Top recommended universities (empty if route_to_university=False).")
