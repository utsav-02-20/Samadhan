try:
    from .categorization import categorize_problem
    from .university_data import get_universities, reload_universities
    from .routing import route_problem
except (ImportError, ValueError):
    from categorization import categorize_problem
    from university_data import get_universities, reload_universities
    from routing import route_problem

__all__ = [
    "categorize_problem",
    "get_universities",
    "reload_universities",
    "route_problem",
]
