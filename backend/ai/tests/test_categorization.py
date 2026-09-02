import os
import sys
import unittest
from unittest.mock import patch
from fastapi.testclient import TestClient

# Ensure backend/ai is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from main import app
from schemas.problem import ProblemAnalysis, ProblemClassifyRequest
from services.categorization import categorize_problem, _clean_json_text


class TestProblemCategorization(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)

    def test_root_and_health_endpoints(self):
        """Verify root and health endpoints return 200 OK."""
        res_root = self.client.get("/")
        self.assertEqual(res_root.status_code, 200)
        self.assertEqual(res_root.json()["message"], "Samadhan AI is running!")

        res_health = self.client.get("/health")
        self.assertEqual(res_health.status_code, 200)
        data = res_health.json()
        self.assertEqual(data["status"], "healthy")
        self.assertIn("mode", data)

    def test_example_1_agriculture_rnd(self):
        """
        Example 1: Soil fertility in Gumla
        Standardized schema: { title, description, district, category }
        Expect domain=Agriculture, district=Gumla, is_rnd=True
        """
        payload = {
            "title": "Soil fertility decline and crop recommendation",
            "description": "Farmers in Gumla are facing problems because the soil has become less fertile. "
                           "We need a low-cost system to analyze soil quality and recommend suitable crops.",
            "district": "Gumla",
            "category": "Agriculture"
        }
        res = self.client.post("/api/v1/ai/classify", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()

        # Validate against schema
        analysis = ProblemAnalysis(**data)
        self.assertEqual(analysis.domain, "Agriculture")
        self.assertEqual(analysis.district, "Gumla")
        self.assertTrue(analysis.is_rnd, "Should be categorized as an R&D challenge")
        self.assertIn(analysis.severity, ["Low", "Medium", "High", "Critical"])
        self.assertGreaterEqual(len(analysis.required_skills), 1)

    def test_example_2_water_resources_rnd(self):
        """
        Example 2: Groundwater contamination in Dhanbad
        Standardized schema: { title, description, district, category }
        Expect domain=Water Resources, district=Dhanbad, is_rnd=True
        """
        payload = {
            "title": "Groundwater contamination detection",
            "description": "Groundwater in Dhanbad has high heavy metal runoff from coal mines. "
                           "Need automated sensor monitoring and early warning system.",
            "district": "Dhanbad",
            "category": "Water Supply"
        }
        res = self.client.post("/api/v1/ai/classify", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()

        analysis = ProblemAnalysis(**data)
        self.assertEqual(analysis.domain, "Water Resources")
        self.assertEqual(analysis.district, "Dhanbad")
        self.assertTrue(analysis.is_rnd)
        self.assertGreaterEqual(len(analysis.required_skills), 1)

    def test_example_3_routine_civic_grievance(self):
        """
        Example 3: Broken street light in Ranchi
        Standardized schema: { title, description, district, category }
        Expect is_rnd=False (routine maintenance, not academic research)
        """
        payload = {
            "title": "Broken street light on Main Road",
            "description": "Street light bulb is broken and not glowing on Main Road, Ranchi near market. Replace the bulb.",
            "district": "Ranchi",
            "category": "Street Lights"
        }
        res = self.client.post("/api/v1/ai/classify", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()

        analysis = ProblemAnalysis(**data)
        self.assertEqual(analysis.district, "Ranchi")
        self.assertFalse(analysis.is_rnd, "Routine bulb replacement should NOT be classified as R&D")

    # -------------------------------------------------------------------------
    # SPECIFIC CIVIC VS R&D TEST CASES (A - F)
    # -------------------------------------------------------------------------
    def test_case_a_routine_streetlight_bulb_needs_replacement(self):
        """Case A: Street light bulb needs replacement -> false."""
        res = categorize_problem("Street light bulb needs replacement")
        self.assertFalse(res.is_rnd, "Street light bulb replacement must be is_rnd=False")

    def test_case_b_routine_large_pothole_immediate_repair(self):
        """Case B: Large pothole needs immediate repair -> false."""
        res = categorize_problem("Large pothole needs immediate repair")
        self.assertFalse(res.is_rnd, "Large pothole repair must be is_rnd=False")

    def test_case_c_routine_garbage_collection_not_happening(self):
        """Case C: Garbage collection is not happening -> false."""
        res = categorize_problem("Garbage collection is not happening")
        self.assertFalse(res.is_rnd, "Garbage collection complaint must be is_rnd=False")

    def test_case_d_rnd_ai_based_pothole_detection_system(self):
        """Case D: AI based pothole detection system -> true."""
        res = categorize_problem("AI based pothole detection system")
        self.assertTrue(res.is_rnd, "AI pothole detection system must be is_rnd=True")

    def test_case_e_rnd_iot_based_smart_streetlight_monitoring(self):
        """Case E: IoT based smart streetlight monitoring -> true."""
        res = categorize_problem("IoT based smart streetlight monitoring")
        self.assertTrue(res.is_rnd, "IoT smart streetlight monitoring must be is_rnd=True")

    def test_case_f_rnd_intelligent_traffic_signal_optimization_system(self):
        """Case F: Intelligent traffic signal optimization system -> true."""
        res = categorize_problem("Intelligent traffic signal optimization system")
        self.assertTrue(res.is_rnd, "Intelligent traffic optimization system must be is_rnd=True")

    def test_routine_civic_variations_all_false(self):
        """Verify natural language variations of routine civic maintenance are all is_rnd=False."""
        variations = [
            "The street light bulb needs to be replaced.",
            "Replace the fused street light bulb.",
            "The street light is not working.",
            "Repair the broken street light.",
            "Fix the pothole on the road.",
            "Repair the damaged road.",
            "Garbage needs to be collected.",
            "Clear the blocked drain.",
            "Repair the leaking tap.",
            "bulb replacement needed on 5th avenue",
            "broken street light near temple",
            "pothole needs repair immediately"
        ]
        for v in variations:
            res = categorize_problem(v)
            self.assertFalse(res.is_rnd, f"Expected is_rnd=False for routine civic text: '{v}'")

    def test_true_rnd_variations_all_true(self):
        """Verify advanced technological solutions remain is_rnd=True."""
        rnd_cases = [
            "Develop an AI system to automatically detect potholes using cameras.",
            "Build an IoT-based smart streetlight monitoring system.",
            "Develop a predictive maintenance system for streetlights.",
            "Create an intelligent traffic signal optimization system.",
            "Develop a sensor-based groundwater contamination monitoring system."
        ]
        for r in rnd_cases:
            res = categorize_problem(r)
            self.assertTrue(res.is_rnd, f"Expected is_rnd=True for R&D text: '{r}'")

    def test_missing_required_fields_returns_422(self):
        """Missing title or description should be rejected with 422 Unprocessable Entity."""
        # Missing description
        res1 = self.client.post("/api/v1/ai/classify", json={"title": "Short title"})
        self.assertEqual(res1.status_code, 422)

        # Missing title
        res2 = self.client.post("/api/v1/ai/classify", json={"description": "Long enough description text here."})
        self.assertEqual(res2.status_code, 422)

        # Empty body
        res3 = self.client.post("/api/v1/ai/classify", json={})
        self.assertEqual(res3.status_code, 422)

    def test_direct_service_call_with_alias(self):
        """Verify district alias resolution (e.g. Jamshedpur -> East Singhbhum)."""
        req = ProblemClassifyRequest(
            title="Monsoon drainage pump automation",
            description="Water logging in Jamshedpur during monsoon requires smart drainage pump automation.",
            category="Drainage"
        )
        analysis = categorize_problem(req)
        self.assertEqual(analysis.district, "East Singhbhum")
        self.assertTrue(analysis.is_rnd)

    def test_severity_normalization(self):
        """Verify various severity inputs get cleanly normalized."""
        a1 = ProblemAnalysis(
            domain="Test", subdomain="Sub", is_rnd=True,
            severity="urgent", required_skills=["Python"]
        )
        self.assertEqual(a1.severity, "High")

        a2 = ProblemAnalysis(
            domain="Test", subdomain="Sub", is_rnd=True,
            severity="disaster emergency", required_skills=["Python"]
        )
        self.assertEqual(a2.severity, "Critical")

        a3 = ProblemAnalysis(
            domain="Test", subdomain="Sub", is_rnd=True,
            severity="minor issue", required_skills=["Python"]
        )
        self.assertEqual(a3.severity, "Low")

    def test_clean_json_text_utility(self):
        """Verify markdown code fence stripping and JSON extraction."""
        raw_markdown = (
            "Here is the result:\n"
            "```json\n"
            "{\"domain\": \"Agriculture\", \"subdomain\": \"Soil\", \"required_skills\": [], \"is_rnd\": true}\n"
            "```\nHope this helps!"
        )
        cleaned = _clean_json_text(raw_markdown)
        self.assertTrue(cleaned.startswith("{"))
        self.assertTrue(cleaned.endswith("}"))

    @patch("services.categorization.is_gemini_configured", return_value=True)
    @patch("services.categorization._classify_with_gemini")
    def test_gemini_api_error_triggers_fallback(self, mock_gemini, mock_configured):
        """When Gemini throws an API exception, fallback must kick in without crashing."""
        mock_gemini.side_effect = RuntimeError("API connection timeout")
        req = ProblemClassifyRequest(
            title="Soil fertility decline",
            description="Farmers in Gumla face poor soil quality. Need a low-cost soil testing system.",
            district="Gumla"
        )
        analysis = categorize_problem(req)
        self.assertEqual(analysis.domain, "Agriculture")
        self.assertEqual(analysis.district, "Gumla")
        self.assertTrue(analysis.is_rnd)


if __name__ == "__main__":
    unittest.main()
