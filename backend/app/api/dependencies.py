from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import ValidationError
from bson import ObjectId

from app.core.config import settings
from app.db.database import get_database
from app.schemas.user import TokenPayload

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login"
)

async def get_current_user(
    db = Depends(get_database), token: str = Depends(oauth2_scheme)
):
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    
    try:
        user_id = ObjectId(token_data.sub)
    except:
        raise HTTPException(status_code=400, detail="Invalid token subject format")

    user = await db["users"].find_one({"_id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    user["id"] = str(user["_id"])
    del user["_id"]
    return user

async def get_current_active_user(
    current_user = Depends(get_current_user),
):
    if not current_user.get("is_active", True):
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
