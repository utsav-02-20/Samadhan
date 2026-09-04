"""
====================================================================
SAMADHAN SETU AI - FAST HIERARCHICAL CATEGORY ENGINE
====================================================================
Provides sub-5ms, state-of-the-art hierarchical classification:
  Level 1: Parent Grievance Category
  Level 2: Fine-grained Grievance Category
  Department / Ministry Mapping
====================================================================
"""

import re
import joblib
import numpy as np
import pandas as pd
from pathlib import Path

AI_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = AI_DIR.parent
DEFAULT_PATHS = [
    AI_DIR / "fast_category_engine.joblib",
    PROJECT_ROOT / "models" / "fast_category_engine.joblib",
    PROJECT_ROOT / "outputs" / "models" / "fast_category_engine.joblib",
]
MODEL_PATH = next((p for p in DEFAULT_PATHS if p.exists()), DEFAULT_PATHS[0])

def clean_text(text):
    if text is None or pd.isna(text):
        return ""
    text = str(text).lower()
    text = re.sub(r"https?://\S+|www\.\S+", " ", text)
    text = re.sub(r"\S+@\S+", " ", text)
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

class FastCategoryEngine:
    def __init__(self, model_path=None):
        target_path = Path(model_path) if model_path else MODEL_PATH
        if not target_path.exists():
            raise FileNotFoundError(f"Category engine artifact not found at: {target_path}")

        bundle = joblib.load(target_path)
        self.vectorizer = bundle["vectorizer"]
        self.parent_model = bundle["parent_model"]
        self.parent_classes = bundle["parent_classes"]
        self.fine_models = bundle["fine_models"]
        self.category_metadata = bundle.get("category_metadata", {})
        self.metrics = bundle.get("metrics", {})

    def predict(self, text):
        cleaned = clean_text(text)
        if not cleaned:
            return {
                "parent_category_code": "UNKNOWN",
                "parent_category_name": "General Grievance",
                "parent_confidence": 0.0,
                "fine_category_code": "UNKNOWN",
                "fine_category_name": "General Grievance",
                "fine_confidence": 0.0,
                "org_code": "GOV",
                "org_name": "Government of India",
                "status": "empty_input"
            }

        X = self.vectorizer.transform([cleaned])

        # 1. Level-1 Parent Prediction
        parent_pred = str(self.parent_model.predict(X)[0])
        parent_conf = 0.90
        try:
            decision = self.parent_model.decision_function(X)[0]
            max_val = float(np.max(decision))
            parent_conf = float(1.0 / (1.0 + np.exp(-max_val)))
        except Exception:
            pass

        # 2. Level-2 Hierarchical Fine Prediction
        fine_info = self.fine_models.get(parent_pred)
        if fine_info is None:
            fine_code = parent_pred
            fine_conf = parent_conf
        elif fine_info["type"] == "constant":
            fine_code = str(fine_info["code"])
            fine_conf = 1.0
        else:
            local_model = fine_info["model"]
            fine_code = str(local_model.predict(X)[0])
            fine_conf = 0.92
            try:
                sub_dec = local_model.decision_function(X)[0]
                max_sub = float(np.max(sub_dec))
                fine_conf = float(1.0 / (1.0 + np.exp(-max_sub)))
            except Exception:
                pass

        # 3. Metadata resolution
        parent_meta = self.category_metadata.get(parent_pred, {})
        fine_meta = self.category_metadata.get(fine_code, {})

        p_name = parent_meta.get("name") or f"Category {parent_pred}"
        f_name = fine_meta.get("name") or f"Subcategory {fine_code}"
        org_code = fine_meta.get("org_code") or parent_meta.get("org_code") or "GOV"
        org_name = fine_meta.get("org_name") or parent_meta.get("org_name") or f"Department of {org_code}"

        return {
            "parent_category_code": parent_pred,
            "parent_category_name": p_name,
            "parent_confidence": round(parent_conf, 4),
            "fine_category_code": fine_code,
            "fine_category_name": f_name,
            "fine_confidence": round(fine_conf, 4),
            "org_code": org_code,
            "org_name": org_name,
            "status": "success"
        }
