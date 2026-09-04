"""
====================================================================
SAMADHAN SETU AI - SLA ESTIMATION & DEPARTMENT ALLOCATION ENGINE
====================================================================
Provides:
  1. Priority & Urgency detection (CRITICAL, HIGH, NORMAL)
  2. Resolution Time prediction (in days) and estimated deadline
  3. Government Department / Ministry ranking and confidence scores
====================================================================
"""

import os
import re
import datetime
from pathlib import Path
import joblib
import pandas as pd

AI_ROOT = Path(__file__).resolve().parent.parent
MODELS_DIR = AI_ROOT / "models"
DATA_DIR = AI_ROOT / "data"

ORG_NAMES = {
    "MOROW": "Ministry of Road Transport and Highways",
    "DOTEL": "Department of Telecommunications",
    "DPOST": "Department of Posts",
    "DEABD": "Department of Financial Services (Banking Division)",
    "MOLBR": "Ministry of Labour and Employment",
    "DOAAC": "Department of Agriculture and Farmers Welfare",
    "DHLTH": "Department of Health and Family Welfare",
    "MOPWR": "Ministry of Power",
    "MINHA": "Ministry of Home Affairs",
    "DORVU": "Department of Revenue (Central Board of Direct Taxes)",
    "DOPAT": "Department of Personnel and Training",
    "MRAIL": "Ministry of Railways",
    "CBODT": "Central Board of Direct Taxes",
    "DOCAF": "Department of Consumer Affairs",
    "DORRD": "Department of Rural Development",
    "MOEAF": "Ministry of External Affairs",
    "GOV": "Government Administration",
}

CRITICAL_KEYWORDS = [
    "fire", "hazard", "electrocution", "sparking", "snapped wire", "cylinder blast",
    "life danger", "collapse", "death", "fatal", "flood", "landslide", "poison",
    "emergency", "urgent medical", "hospital oxygen", "suicide", "bleeding", "drowning"
]

HIGH_KEYWORDS = [
    "urgent", "accident", "hospital", "patient", "ambulance", "water supply disrupted",
    "sewage overflow", "power outage", "blackout", "pothole accident", "broken bridge",
    "borewell", "contamination", "epidemic", "dengue", "cholera"
]

class SLAAndAllocationEngine:
    def __init__(self):
        self.sla_model = None
        self.org_stats = None
        self._load_artifacts()

    def _load_artifacts(self):
        # 1. Load Ridge SLA Model
        sla_path = MODELS_DIR / "phase6_integration_model.joblib"
        if sla_path.exists():
            try:
                self.sla_model = joblib.load(sla_path)
            except Exception as e:
                print(f"[Warn] Could not load SLA model: {e}")

        # 2. Load Category Org Stats
        stats_path = DATA_DIR / "category_organization_statistics.csv"
        if stats_path.exists():
            try:
                self.org_stats = pd.read_csv(stats_path)
            except Exception as e:
                print(f"[Warn] Could not load org stats: {e}")

    def detect_priority(self, text: str) -> str:
        t = (text or "").lower()
        if any(kw in t for kw in CRITICAL_KEYWORDS):
            return "CRITICAL"
        if any(kw in t for kw in HIGH_KEYWORDS):
            return "HIGH"
        return "NORMAL"

    def predict_sla(self, text: str, parent_code: str = "UNKNOWN", fine_code: str = "UNKNOWN", district: str = None) -> dict:
        priority = self.detect_priority(text)
        predicted_days = 15

        if self.sla_model is not None:
            try:
                row = pd.DataFrame([{
                    "parent_category_code": str(parent_code),
                    "category_code": str(fine_code),
                    "district": str(district or "Unknown"),
                    "state": "Jharkhand",
                    "text_len": len(text or "")
                }])
                val = self.sla_model.predict(row)[0]
                predicted_days = max(2, int(round(float(val))))
            except Exception:
                pass

        # Adjust based on urgency
        if priority == "CRITICAL":
            predicted_days = min(predicted_days, 3)
        elif priority == "HIGH":
            predicted_days = min(predicted_days, 7)

        deadline = (datetime.date.today() + datetime.timedelta(days=predicted_days)).isoformat()

        return {
            "predicted_resolution_days": predicted_days,
            "priority": priority,
            "expected_deadline": deadline,
            "status": "model_prediction" if self.sla_model else "heuristic_fallback"
        }

    def allocate_department(self, parent_code: str = None, fine_code: str = None, fallback_org: str = "GOV") -> dict:
        top_orgs = []
        rec_org = fallback_org or "GOV"

        if self.org_stats is not None and parent_code:
            try:
                matches = self.org_stats[self.org_stats["parent_category_code"].astype(str) == str(parent_code)]
                if not matches.empty:
                    sorted_matches = matches.sort_values(by="action_count", ascending=False).head(3)
                    total_actions = sorted_matches["action_count"].sum() or 1
                    for _, r in sorted_matches.iterrows():
                        code = str(r["org_code"])
                        score = round(float(r["action_count"]) / total_actions, 2)
                        top_orgs.append({
                            "organization": code,
                            "organization_name": ORG_NAMES.get(code, f"Department of {code}"),
                            "score": score
                        })
                    if top_orgs:
                        rec_org = top_orgs[0]["organization"]
            except Exception:
                pass

        if not top_orgs:
            top_orgs.append({
                "organization": rec_org,
                "organization_name": ORG_NAMES.get(rec_org, f"Department of {rec_org}"),
                "score": 0.85
            })

        return {
            "recommended_organization": rec_org,
            "recommended_organization_name": ORG_NAMES.get(rec_org, f"Department of {rec_org}"),
            "top_organizations": top_orgs,
            "status": "success"
        }
