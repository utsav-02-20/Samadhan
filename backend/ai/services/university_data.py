import json
import logging
import os
from typing import List, Optional

try:
    from ..schemas.university import University
except (ImportError, ValueError):
    from schemas.university import University

logger = logging.getLogger("samadhan_ai.university_data")

# Path to the university dataset
DEFAULT_DATA_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "data",
    "universities.json"
)

# In-memory cache for loaded universities
_CACHED_UNIVERSITIES: Optional[List[University]] = None


def load_universities_from_file(file_path: Optional[str] = None) -> List[University]:
    """
    Read, parse, and validate universities from a JSON file.
    Raises FileNotFoundError if missing, or ValueError if malformed.
    """
    path = file_path or DEFAULT_DATA_PATH
    if not os.path.exists(path):
        raise FileNotFoundError(f"University dataset not found at '{path}'.")

    try:
        with open(path, "r", encoding="utf-8") as f:
            raw_data = json.load(f)
    except json.JSONDecodeError as e:
        raise ValueError(f"Malformed JSON in university dataset at '{path}': {e}")
    except Exception as e:
        raise ValueError(f"Failed to read university dataset at '{path}': {e}")

    if not isinstance(raw_data, list):
        raise ValueError(f"Expected a list of university records in '{path}', got {type(raw_data).__name__}.")

    universities = []
    for idx, item in enumerate(raw_data):
        if not isinstance(item, dict):
            raise ValueError(f"University record at index {idx} is not a valid dictionary.")
        try:
            uni = University(**item)
            universities.append(uni)
        except Exception as e:
            raise ValueError(f"Validation error in university record at index {idx} ({item.get('name', 'unknown')}): {e}")

    logger.info(f"Successfully loaded and validated {len(universities)} universities from '{path}'.")
    return universities


def get_universities(force_reload: bool = False, file_path: Optional[str] = None) -> List[University]:
    """
    Return the cached list of validated universities.
    Loads from disk once, caching the result in memory.
    """
    global _CACHED_UNIVERSITIES
    if _CACHED_UNIVERSITIES is None or force_reload or file_path is not None:
        _CACHED_UNIVERSITIES = load_universities_from_file(file_path)
    return _CACHED_UNIVERSITIES


def reload_universities() -> List[University]:
    """Force-reload the dataset from disk and refresh cache."""
    return get_universities(force_reload=True)
