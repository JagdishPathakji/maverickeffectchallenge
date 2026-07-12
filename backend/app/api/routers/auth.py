from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.core import security
from app.core.config import settings
from app.api.dependencies import get_database
from app.schemas.user import UserCreate, User as UserSchema, Token

router = APIRouter()

@router.post("/register", response_model=UserSchema)
async def register(user_in: UserCreate, db = Depends(get_database)):
    existing_user = await db["users"].find_one({"email": user_in.email})
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    
    user_doc = {
        "email": user_in.email,
        "hashed_password": security.get_password_hash(user_in.password),
        "full_name": user_in.full_name,
        "is_active": True,
        "created_at": datetime.utcnow()
    }
    
    result = await db["users"].insert_one(user_doc)
    user_doc["id"] = str(result.inserted_id)
    if "_id" in user_doc:
        del user_doc["_id"]
    
    return user_doc

@router.post("/login", response_model=Token)
async def login_access_token(
    db = Depends(get_database), form_data: OAuth2PasswordRequestForm = Depends()
):
    user = await db["users"].find_one({"email": form_data.username})
    if not user or not security.verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )
    elif not user.get("is_active", True):
        raise HTTPException(status_code=400, detail="Inactive user")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(
            str(user["_id"]), expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }
