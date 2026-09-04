from typing import List, Optional
from pydantic import BaseModel, Field, field_validator


class ProblemClassifyRequest(BaseModel):
    """
    Standardized request model for problem classification.
    Matches the citizen complaint structure from frontend/Node.js backend.
    """
    title: str = Field(..., min_length=3, description="Complaint or challenge title.")
    description: str = Field(..., min_length=10, description="Detailed problem description.")
    district: Optional[str] = Field(None, description="Reported district (if known).")
    category: Optional[str] = Field(None, description="Initial civic category submitted by citizen.")

    def get_full_text(self) -> str:
        """Combine fields into cohesive text representation for categorization."""
        parts = [
            f"Title: {self.title.strip()}",
            f"Description: {self.description.strip()}"
        ]
        if self.category:
            parts.append(f"Category: {self.category.strip()}")
        if self.district:
            parts.append(f"District: {self.district.strip()}")
        return "\n".join(parts)


class ProblemAnalysis(BaseModel):
    """Structured analysis produced by the AI categorization engine."""
    domain: str = Field(..., description="The domain of the problem (e.g. Agriculture, Water Resources, Healthcare).")
    subdomain: str = Field(..., description="The specific subdomain of the problem (e.g. Soil Science, Waste Management).")
    required_skills: List[str] = Field(default_factory=list, description="A list of technical skills/expertise needed to address the problem.")
    district: Optional[str] = Field(None, description="The district related to the problem, if identified.")
    severity: str = Field(default="Medium", description="The severity level: Low, Medium, High, or Critical.")
    is_rnd: bool = Field(..., description="Indicates whether the problem requires R&D/scientific innovation (True) or is routine civic maintenance (False).")
    parent_category_code: Optional[str] = Field(None, description="CPGRAMS parent category code")
    fine_category_code: Optional[str] = Field(None, description="CPGRAMS subcategory code")
    department: Optional[str] = Field(None, description="Recommended government department or ministry")
    confidence: Optional[float] = Field(None, description="Model prediction confidence score")
    predicted_resolution_days: Optional[int] = Field(None, description="Estimated resolution duration in days")
    expected_deadline: Optional[str] = Field(None, description="Estimated completion date (ISO format)")
    priority: Optional[str] = Field(None, description="Action priority level: CRITICAL, HIGH, NORMAL")

    @field_validator("severity", mode="before")
    @classmethod
    def normalize_severity(cls, value: Optional[str]) -> str:
        if not value:
            return "Medium"
        v = str(value).strip().title()
        if v in {"Low", "Medium", "High", "Critical"}:
            return v
        lower = v.lower()
        if "crit" in lower or "fatal" in lower or "disaster" in lower:
            return "Critical"
        if "high" in lower or "urgent" in lower or "severe" in lower:
            return "High"
        if "low" in lower or "minor" in lower:
            return "Low"
        return "Medium"

    @field_validator("required_skills", mode="before")
    @classmethod
    def clean_skills(cls, value) -> List[str]:
        if isinstance(value, str):
            return [s.strip() for s in value.split(",") if s.strip()]
        if isinstance(value, list):
            return [str(s).strip() for s in value if str(s).strip()]
        return []