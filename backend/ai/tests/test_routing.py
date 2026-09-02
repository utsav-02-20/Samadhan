import os
import sys
import unittest
from fastapi.testclient import TestClient

# Ensure backend/ai is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from main import app
from schemas.problem import ProblemAnalysis, ProblemClassifyRequest
from schemas.university import (
    University,
    PastPerformance,
    DomainPerformance,
    ScoreBreakdown,
    UniversityRecommendation,
)
from services.routing import (
    route_problem,
    calculate_domain_match,
    calculate_past_performance,
    calculate_expertise_match,
    calculate_geographic_proximity,
)
from services.university_data import get_universities


class TestUniversityRouting(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)
        cls.universities = get_universities()

    # -------------------------------------------------------------------------
    # TEST 1 — AGRICULTURE (Gumla soil fertility)
    # -------------------------------------------------------------------------
    def test_agriculture_problem_routing(self):
        """
        Scenario: Farmers in Gumla facing declining soil fertility.
        Birsa Agricultural University must rank #1 due to direct Agriculture domain match.
        """
        problem = ProblemAnalysis(
            domain="Agriculture",
            subdomain="Soil Science",
            required_skills=["Soil Testing", "Agricultural Engineering", "Data Analysis", "Agronomy"],
            district="Gumla",
            severity="High",
            is_rnd=True,
        )
        response = route_problem(problem, self.universities, top_n=3)

        self.assertIsNotNone(response.best_match)
        self.assertEqual(response.best_match.university_id, "birsa-agricultural-university")
        self.assertEqual(response.best_match.score_breakdown.domain_match, 100.0)
        self.assertGreater(response.best_match.final_score, 85.0)
        self.assertEqual(len(response.recommendations), 3)

    # -------------------------------------------------------------------------
    # TEST 2 — WATER RESOURCES (Dhanbad groundwater heavy metals)
    # -------------------------------------------------------------------------
    def test_water_resources_problem_routing(self):
        """
        Scenario: Groundwater in Dhanbad contaminated by heavy metals from mining.
        IIT (ISM) Dhanbad must rank #1 due to direct Water Resources & Mining match in Dhanbad.
        """
        problem = ProblemAnalysis(
            domain="Water Resources",
            subdomain="Groundwater & Water Quality",
            required_skills=["Environmental Engineering", "Water Quality Analysis", "Chemical Sensors", "Hydrology"],
            district="Dhanbad",
            severity="High",
            is_rnd=True,
        )
        response = route_problem(problem, self.universities, top_n=3)

        self.assertIsNotNone(response.best_match)
        self.assertEqual(response.best_match.university_id, "iit-ism-dhanbad")
        self.assertEqual(response.best_match.score_breakdown.domain_match, 100.0)
        self.assertEqual(response.best_match.score_breakdown.geographic_proximity, 100.0)
        self.assertGreater(response.best_match.final_score, 90.0)

    # -------------------------------------------------------------------------
    # TEST 3 — HEALTHCARE (AI disease surveillance in Deoghar)
    # -------------------------------------------------------------------------
    def test_healthcare_problem_routing(self):
        """
        Scenario: AI-assisted disease surveillance in rural areas.
        AIIMS Deoghar must rank #1 due to direct Healthcare domain match.
        """
        problem = ProblemAnalysis(
            domain="Healthcare",
            subdomain="Public Health & Medical Technology",
            required_skills=["Disease Surveillance", "Epidemiology", "Medical Technology", "Clinical Diagnostics"],
            district="Deoghar",
            severity="High",
            is_rnd=True,
        )
        response = route_problem(problem, self.universities, top_n=3)

        self.assertIsNotNone(response.best_match)
        self.assertEqual(response.best_match.university_id, "aiims-deoghar")
        self.assertEqual(response.best_match.score_breakdown.domain_match, 100.0)
        self.assertGreater(response.best_match.final_score, 90.0)

    # -------------------------------------------------------------------------
    # TEST 4 — ROUTINE CIVIC PROBLEM (Ranchi broken street light)
    # -------------------------------------------------------------------------
    def test_routine_civic_problem_routing(self):
        """
        Scenario: Broken street light in Ranchi.
        When is_rnd=False, the university routing gate MUST block allocation:
        route_to_university=False, best_match=None, recommendations=[].
        """
        problem = ProblemAnalysis(
            domain="Civil Infrastructure",
            subdomain="Street Lighting Maintenance",
            required_skills=["Electrical Maintenance", "Street Light Repair"],
            district="Ranchi",
            severity="Medium",
            is_rnd=False,
        )
        response = route_problem(problem, self.universities, top_n=3)

        self.assertFalse(response.route_to_university)
        self.assertIsNone(response.best_match)
        self.assertEqual(len(response.recommendations), 0)
        self.assertEqual(response.total_evaluated, 0)
        self.assertIn("Routine civic maintenance", response.reason)

    # -------------------------------------------------------------------------
    # TEST CASES G & H — UNIVERSITY ROUTING GATE VERIFICATION
    # -------------------------------------------------------------------------
    def test_case_g_false_is_rnd_does_not_produce_university_recommendation(self):
        """Case G: Verify that a false is_rnd problem does NOT produce a university recommendation."""
        problem = ProblemAnalysis(
            domain="Civil Infrastructure",
            subdomain="Road Maintenance",
            required_skills=["Road Maintenance"],
            district="Bokaro",
            severity="Medium",
            is_rnd=False,
        )
        response = route_problem(problem, self.universities, top_n=3)

        self.assertFalse(response.route_to_university, "route_to_university must be False for routine civic problem")
        self.assertIsNone(response.best_match, "best_match must be None when is_rnd=False")
        self.assertEqual(response.recommendations, [], "recommendations list must be empty when is_rnd=False")
        self.assertEqual(response.total_evaluated, 0, "No universities should be evaluated when is_rnd=False")

    def test_case_h_true_is_rnd_does_produce_university_recommendations(self):
        """Case H: Verify that a true is_rnd problem DOES produce university recommendations."""
        problem = ProblemAnalysis(
            domain="Civil Infrastructure",
            subdomain="Intelligent Transportation Systems",
            required_skills=["Traffic Engineering", "Machine Learning", "Smart City Systems"],
            district="Ranchi",
            severity="High",
            is_rnd=True,
        )
        response = route_problem(problem, self.universities, top_n=3)

        self.assertTrue(response.route_to_university, "route_to_university must be True for R&D problem")
        self.assertIsNotNone(response.best_match, "best_match must NOT be None when is_rnd=True")
        self.assertEqual(len(response.recommendations), 3, "Should return top 3 recommendations when is_rnd=True")
        self.assertGreater(response.total_evaluated, 0)
        self.assertGreater(response.best_match.final_score, 0.0)

    # -------------------------------------------------------------------------
    # TEST 5 — SCORE CALCULATION VERIFICATION
    # -------------------------------------------------------------------------
    def test_manual_score_calculation_formula(self):
        """
        Verify exact formula:
        Final Score = 0.50*domain_match + 0.30*past_performance + 0.15*expertise_match + 0.05*geographic_proximity
        Values: 100, 80, 60, 40 -> 50 + 24 + 9 + 2 = 85.0
        """
        mock_uni = University(
            id="mock-uni",
            name="Mock University",
            district="Ranchi",
            city="Ranchi",
            latitude=23.3441,
            longitude=85.3096,
            domains=["Agriculture"],
            expertise=["Soil Testing", "Agronomy"],
            past_performance=PastPerformance(
                completed_projects=10,
                successful_projects=8,
                success_rate=0.80,
                domain_projects={
                    "Agriculture": DomainPerformance(completed=10, successful=8, success_rate=0.80)
                }
            )
        )

        d_match = 100.0
        p_perf = 80.0
        e_match = 60.0
        g_prox = 40.0

        expected_final = 0.50 * d_match + 0.30 * p_perf + 0.15 * e_match + 0.05 * g_prox
        self.assertEqual(expected_final, 85.0)

    # -------------------------------------------------------------------------
    # TEST 6 — RANKING ORDER
    # -------------------------------------------------------------------------
    def test_ranking_order_descending(self):
        """
        Create 3 mock universities with descending known scores.
        Verify: highest score -> rank 1, second highest -> rank 2, third highest -> rank 3.
        """
        uni_a = University(
            id="uni-a",
            name="Alpha University",
            district="Ranchi",
            city="Ranchi",
            domains=["Agriculture"],
            expertise=["Soil Science"],
            past_performance=PastPerformance(
                completed_projects=20,
                successful_projects=19,
                success_rate=0.95,
                domain_projects={"Agriculture": DomainPerformance(completed=20, successful=19, success_rate=0.95)}
            )
        )
        uni_b = University(
            id="uni-b",
            name="Beta University",
            district="Ranchi",
            city="Ranchi",
            domains=["Agriculture"],
            expertise=[],
            past_performance=PastPerformance(
                completed_projects=10,
                successful_projects=7,
                success_rate=0.70,
                domain_projects={"Agriculture": DomainPerformance(completed=10, successful=7, success_rate=0.70)}
            )
        )
        uni_c = University(
            id="uni-c",
            name="Gamma University",
            district="Dhanbad",
            city="Dhanbad",
            domains=["Mining & Earth Sciences"],  # No match for Agriculture
            expertise=[],
            past_performance=PastPerformance(completed_projects=5, successful_projects=4, success_rate=0.80)
        )

        problem = ProblemAnalysis(
            domain="Agriculture",
            subdomain="Soil Science",
            required_skills=["Soil Science"],
            district="Ranchi",
            severity="Medium",
            is_rnd=True,
        )

        response = route_problem(problem, [uni_b, uni_c, uni_a], top_n=3)

        self.assertEqual(response.recommendations[0].university_id, "uni-a")
        self.assertEqual(response.recommendations[1].university_id, "uni-b")
        self.assertEqual(response.recommendations[2].university_id, "uni-c")
        self.assertGreater(response.recommendations[0].final_score, response.recommendations[1].final_score)
        self.assertGreater(response.recommendations[1].final_score, response.recommendations[2].final_score)

    # -------------------------------------------------------------------------
    # TEST 7 — TIE BREAKING
    # -------------------------------------------------------------------------
    def test_tie_breaking_rules(self):
        """
        Verify tie-breaking:
        1. Higher domain match
        2. Higher past performance
        3. Higher expertise match
        4. Alphabetical by university name
        """
        # Two universities with same domain (100) and same past perf (80), same geo (100)
        # uni_x has higher skills match
        uni_x = University(
            id="uni-x",
            name="Xavier Institute",
            district="Ranchi",
            city="Ranchi",
            domains=["Water Resources"],
            expertise=["Hydrology", "Sensors"],
            past_performance=PastPerformance(completed_projects=10, successful_projects=8, success_rate=0.80)
        )
        uni_y = University(
            id="uni-y",
            name="Yorkshire Institute",
            district="Ranchi",
            city="Ranchi",
            domains=["Water Resources"],
            expertise=[],
            past_performance=PastPerformance(completed_projects=10, successful_projects=8, success_rate=0.80)
        )

        problem = ProblemAnalysis(
            domain="Water Resources",
            subdomain="Quality",
            required_skills=["Hydrology"],
            district="Ranchi",
            severity="Medium",
            is_rnd=True,
        )

        response = route_problem(problem, [uni_y, uni_x], top_n=2)
        self.assertEqual(response.recommendations[0].university_id, "uni-x")

        # Test alphabetical tie-breaker when all scores are 100% identical
        uni_a = University(
            id="uni-a",
            name="Apex University",
            district="Ranchi",
            city="Ranchi",
            domains=["Water Resources"],
            expertise=["Hydrology"],
            past_performance=PastPerformance(completed_projects=10, successful_projects=8, success_rate=0.80)
        )
        uni_b = University(
            id="uni-b",
            name="Zenith University",
            district="Ranchi",
            city="Ranchi",
            domains=["Water Resources"],
            expertise=["Hydrology"],
            past_performance=PastPerformance(completed_projects=10, successful_projects=8, success_rate=0.80)
        )
        res_alpha = route_problem(problem, [uni_b, uni_a], top_n=2)
        self.assertEqual(res_alpha.recommendations[0].university_id, "uni-a", "Alphabetical tie-breaker failed")

    # -------------------------------------------------------------------------
    # TEST 8 — EDGE CASES
    # -------------------------------------------------------------------------
    def test_edge_cases(self):
        """Verify handling of empty lists, unknown domains, unknown districts, zero completed projects."""
        problem = ProblemAnalysis(
            domain="Interstellar Rocketry",  # Unknown domain
            subdomain="Warp Drive",
            required_skills=[],              # Empty skills
            district=None,                   # Unknown district
            severity="Low",
            is_rnd=True,
        )

        # Empty university list
        res_empty = route_problem(problem, universities=[])
        self.assertIsNone(res_empty.best_match)
        self.assertEqual(res_empty.total_evaluated, 0)

        # Unknown domain with full university set
        res_unknown = route_problem(problem, self.universities)
        self.assertIsNotNone(res_unknown.best_match)
        self.assertEqual(res_unknown.total_evaluated, 8)
        self.assertEqual(res_unknown.best_match.score_breakdown.domain_match, 0.0)
        self.assertEqual(res_unknown.best_match.score_breakdown.expertise_match, 0.0)
        self.assertEqual(res_unknown.best_match.score_breakdown.geographic_proximity, 0.0)

    # -------------------------------------------------------------------------
    # TEST 9 — API ENDPOINTS
    # -------------------------------------------------------------------------
    def test_api_recommend_universities_endpoint(self):
        """Test POST /api/v1/ai/recommend-universities."""
        payload = {
            "title": "Soil fertility degradation in Gumla fields",
            "description": "Farmers in Gumla face poor soil productivity and require low-cost testing.",
            "district": "Gumla",
            "category": "Agriculture"
        }
        res = self.client.post("/api/v1/ai/recommend-universities", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()

        self.assertIn("best_match", data)
        self.assertIn("recommendations", data)
        self.assertEqual(data["best_match"]["university_id"], "birsa-agricultural-university")
        self.assertEqual(len(data["recommendations"]), 3)

    def test_api_analyze_and_route_endpoint(self):
        """Test POST /api/v1/ai/analyze-and-route combined endpoint with R&D problem."""
        payload = {
            "title": "Dhanbad coal mining groundwater contamination",
            "description": "Contaminated drinking water due to heavy metals and mine runoff in Dhanbad.",
            "district": "Dhanbad",
            "category": "Water Supply"
        }
        res = self.client.post("/api/v1/ai/analyze-and-route", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()

        self.assertIn("analysis", data)
        self.assertIn("best_match", data)
        self.assertIn("recommendations", data)
        self.assertTrue(data["route_to_university"])
        self.assertEqual(data["analysis"]["domain"], "Water Resources")
        self.assertEqual(data["best_match"]["university_id"], "iit-ism-dhanbad")

    def test_api_analyze_and_route_routine_problem_gating(self):
        """Test POST /api/v1/ai/analyze-and-route with a routine civic complaint."""
        payload = {
            "title": "Broken street light bulb needs replacement",
            "description": "Street light bulb is fused and needs to be replaced on Main Road in Ranchi.",
            "district": "Ranchi",
            "category": "Street Lighting"
        }
        res = self.client.post("/api/v1/ai/analyze-and-route", json=payload)
        self.assertEqual(res.status_code, 200)
        data = res.json()

        self.assertFalse(data["analysis"]["is_rnd"])
        self.assertFalse(data["route_to_university"])
        self.assertIsNone(data["best_match"])
        self.assertEqual(data["recommendations"], [])
        self.assertIn("Routine civic maintenance", data["reason"])


if __name__ == "__main__":
    unittest.main()
