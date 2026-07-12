import os
import json
import google.generativeai as genai
from app.core.config import settings

# Initialize Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

# Use Gemini 2.5 Flash for high quota and fast reasoning
model = genai.GenerativeModel('gemini-2.5-flash')

def parse_ai_response(response_text: str) -> dict:
    """
    Attempts to parse the JSON returned by the LLM.
    Handles potential markdown code blocks.
    """
    text = response_text.strip()
    if text.startswith("```json"):
        text = text[7:]
    if text.startswith("```"):
        text = text[3:]
    if text.endswith("```"):
        text = text[:-3]
        
    try:
        return json.loads(text.strip())
    except json.JSONDecodeError as e:
        print(f"Failed to parse AI JSON: {e}\nRaw output: {response_text}")
        # Fallback dictionary if parsing completely fails
        return {
            "risk_level": "High Risk",
            "confidence_score": 100,
            "scam_category": "Unknown / Error",
            "summary": "We could not process the response properly. Please assume this is suspicious.",
            "detailed_explanation": "An internal error occurred while parsing the AI's response. Do not interact with the message or URL.",
            "warning_signs": ["Internal Analysis Error"],
            "recommended_actions": ["Do not click links", "Do not share OTPs"],
            "prevention_tips": ["Always manually verify with your bank"],
            "response_language": "English"
        }

async def analyze_text(prompt: str) -> dict:
    """
    Sends the prompt to Gemini and parses the response.
    """
    try:
        response = model.generate_content(prompt)
        return parse_ai_response(response.text)
    except Exception as e:
        print(f"Gemini API Error: {e}")
        return parse_ai_response("") # trigger fallback

async def extract_text_from_media(media_bytes: bytes, mime_type: str) -> str:
    """
    Uses Gemini Multimodal to extract text or transcribe audio.
    """
    try:
        prompt = "Please transcribe any speech in this audio, or extract all readable text from this image exactly as written. If there is no speech or text, return only the word: NONE"
        
        response = model.generate_content([
            {"mime_type": mime_type, "data": media_bytes},
            prompt
        ])
        
        text = response.text.strip()
        if text.upper() == "NONE":
            return ""
        return text
    except Exception as e:
        print(f"Gemini Media Extraction Error: {e}")
        return ""
