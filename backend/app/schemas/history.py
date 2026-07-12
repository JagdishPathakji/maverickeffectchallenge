from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class AnalysisResultBase(BaseModel):
    risk_level: str
    confidence_score: int
    scam_category: str
    summary: str
    detailed_explanation: str
    warning_signs: List[str]
    recommended_actions: List[str]
    prevention_tips: List[str]
    response_language: str

class AnalysisCreate(AnalysisResultBase):
    input_type: str
    original_input: str

class AnalysisHistoryInDB(AnalysisCreate):
    id: str
    user_id: str
    created_at: datetime

    class Config:
        from_attributes = True

class UserPreferenceBase(BaseModel):
    preferred_language: Optional[str] = "English"
    theme: Optional[str] = "light"

class UserPreferenceInDB(UserPreferenceBase):
    id: str
    user_id: str

    class Config:
        from_attributes = True
