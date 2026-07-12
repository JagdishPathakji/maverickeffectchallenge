from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from datetime import datetime

from app.api.dependencies import get_current_active_user, get_database
from app.services.ai_service import analyze_text, extract_text_from_media
from app.services.prompt_service import (
    get_message_analysis_prompt,
    get_url_analysis_prompt,
    get_upi_analysis_prompt,
    get_loan_analysis_prompt,
    get_image_analysis_prompt
)

router = APIRouter()

async def save_history(db, user_id, input_type, original_input, ai_result, language):
    history_doc = {
        "user_id": user_id,
        "input_type": input_type,
        "original_input": original_input,
        "risk_level": ai_result.get("risk_level", "Unknown"),
        "confidence_score": ai_result.get("confidence_score", 0),
        "scam_category": ai_result.get("scam_category", "Unknown"),
        "summary": ai_result.get("summary", ""),
        "detailed_explanation": ai_result.get("detailed_explanation", ""),
        "warning_signs": ai_result.get("warning_signs", []),
        "recommended_actions": ai_result.get("recommended_actions", []),
        "prevention_tips": ai_result.get("prevention_tips", []),
        "response_language": language,
        "created_at": datetime.utcnow()
    }
    await db["history"].insert_one(history_doc)
    return history_doc

@router.post("/message")
async def analyze_message_endpoint(
    message: str = Form(...),
    language: str = Form("English"),
    current_user = Depends(get_current_active_user),
    db = Depends(get_database)
):
    prompt = get_message_analysis_prompt(message, language)
    ai_result = await analyze_text(prompt)
    await save_history(db, current_user["id"], "message", message, ai_result, language)
    return ai_result

@router.post("/url")
async def analyze_url_endpoint(
    url: str = Form(...),
    language: str = Form("English"),
    current_user = Depends(get_current_active_user),
    db = Depends(get_database)
):
    prompt = get_url_analysis_prompt(url, language)
    ai_result = await analyze_text(prompt)
    await save_history(db, current_user["id"], "url", url, ai_result, language)
    return ai_result

@router.post("/upi")
async def analyze_upi_endpoint(
    upi_text: str = Form(...),
    language: str = Form("English"),
    current_user = Depends(get_current_active_user),
    db = Depends(get_database)
):
    prompt = get_upi_analysis_prompt(upi_text, language)
    ai_result = await analyze_text(prompt)
    await save_history(db, current_user["id"], "upi", upi_text, ai_result, language)
    return ai_result

@router.post("/loan")
async def analyze_loan_endpoint(
    loan_text: str = Form(...),
    language: str = Form("English"),
    current_user = Depends(get_current_active_user),
    db = Depends(get_database)
):
    prompt = get_loan_analysis_prompt(loan_text, language)
    ai_result = await analyze_text(prompt)
    await save_history(db, current_user["id"], "loan", loan_text, ai_result, language)
    return ai_result

@router.post("/screenshot")
async def analyze_screenshot_endpoint(
    file: UploadFile = File(...),
    language: str = Form("English"),
    current_user = Depends(get_current_active_user),
    db = Depends(get_database)
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")
        
    image_bytes = await file.read()
    
    # 1. Extraction via Gemini Multimodal
    extracted_text = await extract_text_from_media(image_bytes, file.content_type)
    
    if not extracted_text.strip():
        # Fallback if no text found
        return {
            "risk_level": "Unknown",
            "confidence_score": 0,
            "scam_category": "No Text Found",
            "summary": "We couldn't read any text from this image.",
            "detailed_explanation": "The image provided does not contain readable text or our AI failed to extract it.",
            "warning_signs": [],
            "recommended_actions": ["Please upload a clearer screenshot"],
            "prevention_tips": []
        }
        
    # 2. AI Analysis
    prompt = get_image_analysis_prompt(extracted_text, language)
    ai_result = await analyze_text(prompt)
    
    # 3. Save History
    await save_history(db, current_user["id"], "screenshot", extracted_text[:500] + "...", ai_result, language)
    
    return ai_result

@router.post("/audio")
async def analyze_audio_endpoint(
    file: UploadFile = File(...),
    language: str = Form("English"),
    current_user = Depends(get_current_active_user),
    db = Depends(get_database)
):
    if not file.content_type.startswith("audio/"):
        raise HTTPException(status_code=400, detail="File provided is not an audio file.")
        
    audio_bytes = await file.read()
    
    # 1. Extraction via Gemini Multimodal
    extracted_text = await extract_text_from_media(audio_bytes, file.content_type)
    
    if not extracted_text.strip():
        # Fallback if no speech found
        return {
            "risk_level": "Unknown",
            "confidence_score": 0,
            "scam_category": "No Speech Detected",
            "summary": "We couldn't detect any speech in this audio.",
            "detailed_explanation": "The audio file provided does not contain clear speech or our AI failed to transcribe it.",
            "warning_signs": [],
            "recommended_actions": ["Please upload a clearer audio recording"],
            "prevention_tips": []
        }
        
    # 2. AI Analysis (Use message prompt since it's just transcribed text)
    prompt = get_message_analysis_prompt(extracted_text, language)
    ai_result = await analyze_text(prompt)
    
    # 3. Save History
    await save_history(db, current_user["id"], "audio", extracted_text[:500] + "...", ai_result, language)
    
    return ai_result
