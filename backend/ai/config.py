import os
import logging
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger("samadhan_ai")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()

def is_gemini_configured() -> bool:
    """Check if a valid Gemini API key is configured."""
    return bool(GEMINI_API_KEY)

if not is_gemini_configured():
    logger.warning("GEMINI_API_KEY is not set. Service will operate in deterministic fallback mode for offline testing.")