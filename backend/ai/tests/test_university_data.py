import os
import sys
import unittest

# Ensure backend/ai is on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from schemas.university import University, PastPerformance, DomainPerformance
from services.university_data import (
    get_universities,
    reload_universities,
    load_universities_from_file,
)


class TestUniversityData(unittest.TestCase):
    def test_load_all_universities(self):
        """Verify that universities.json contains all 8 required Jharkhand institutions."""
        unis = get_universities()
        self.assertEqual(len(unis), 8, "Expected exactly 8 Jharkhand universities in knowledge base.")

        expected_ids = {
            "bit-mesra",
            "iit-ism-dhanbad",
            "nit-jamshedpur",
            "birsa-agricultural-university",
            "ranchi-university",
            "aiims-deoghar",
            "kolhan-university",
            "vinoba-bhave-university",
        }
        loaded_ids = {u.id for u in unis}
        self.assertEqual(expected_ids, loaded_ids)

    def test_university_fields_and_integrity(self):
        """Verify schema fields, coordinates, domains, and demo data flags."""
        unis = get_universities()
        for u in unis:
            self.assertTrue(u.id, "ID must not be empty.")
            self.assertTrue(u.name, "Name must not be empty.")
            self.assertTrue(u.district, "District must not be empty.")
            self.assertTrue(u.city, "City must not be empty.")
            self.assertGreater(len(u.domains), 0, f"{u.name} must have at least one domain.")
            self.assertGreater(len(u.expertise), 0, f"{u.name} must have at least one expertise.")
            self.assertTrue(u.demo_data, "Seeded performance records must be marked _demo_data: true.")
            self.assertIsNotNone(u.note, "Seeded performance records must have a data note.")

            # Performance checks
            perf = u.past_performance
            self.assertGreaterEqual(perf.completed_projects, 0)
            self.assertGreaterEqual(perf.successful_projects, 0)
            self.assertGreaterEqual(perf.success_rate, 0.0)
            self.assertLessEqual(perf.success_rate, 1.0)

            for d_name, d_perf in perf.domain_projects.items():
                self.assertGreaterEqual(d_perf.completed, 0)
                self.assertGreaterEqual(d_perf.successful, 0)
                self.assertGreaterEqual(d_perf.success_rate, 0.0)
                self.assertLessEqual(d_perf.success_rate, 1.0)

    def test_caching_behavior(self):
        """Verify that get_universities caches the object in memory."""
        unis1 = get_universities()
        unis2 = get_universities()
        self.assertIs(unis1, unis2, "Subsequent calls must return cached object reference.")

        reloaded = reload_universities()
        self.assertEqual(len(reloaded), 8)

    def test_file_not_found_raises(self):
        """Verify that missing file raises FileNotFoundError."""
        with self.assertRaises(FileNotFoundError):
            load_universities_from_file("non_existent_universities.json")


if __name__ == "__main__":
    unittest.main()
