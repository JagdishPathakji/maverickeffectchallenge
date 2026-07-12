import os
from typing import List, Union
from pydantic import AnyHttpUrl, validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "SurakshaAI"
    API_V1_STR: str = "/api/v1"
    
    # JWT Settings
    SECRET_KEY: str = "supersecretkey-change-me-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    
    # Database (MongoDB)
    MONGODB_URI: str = "mongodb+srv://JagdishPathakji:India123456@codingadda.729rziz.mongodb.net/"
    MONGODB_DB_NAME: str = "suraksha_ai"
    
    # AI Settings (Gemini)
    GEMINI_API_KEY: str = ""

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
