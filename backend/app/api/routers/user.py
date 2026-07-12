from typing import List
from fastapi import APIRouter, Depends
from bson import ObjectId

from app.api.dependencies import get_current_active_user, get_database
from app.schemas.user import User as UserSchema
from app.schemas.history import AnalysisHistoryInDB

router = APIRouter()

@router.get("/me", response_model=UserSchema)
async def read_users_me(
    current_user = Depends(get_current_active_user)
):
    return current_user

@router.get("/history", response_model=List[AnalysisHistoryInDB])
async def read_user_history(
    current_user = Depends(get_current_active_user),
    db = Depends(get_database)
):
    user_id = current_user["id"]
    cursor = db["history"].find({"user_id": user_id}).sort("created_at", -1).limit(50)
    
    history_list = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        history_list.append(doc)
        
    return history_list

@router.get("/dashboard-stats")
async def get_dashboard_stats(
    current_user = Depends(get_current_active_user),
    db = Depends(get_database)
):
    user_id = current_user["id"]
    
    safe_count = await db["history"].count_documents({"user_id": user_id, "risk_level": "Safe"})
    suspicious_count = await db["history"].count_documents({"user_id": user_id, "risk_level": "Suspicious"})
    high_risk_count = await db["history"].count_documents({"user_id": user_id, "risk_level": "High Risk"})
    
    cursor = db["history"].find({"user_id": user_id}).sort("created_at", -1).limit(5)
    recent = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        recent.append(doc)
    
    return {
        "total": safe_count + suspicious_count + high_risk_count,
        "safe": safe_count,
        "suspicious": suspicious_count,
        "high_risk": high_risk_count,
        "recent": recent
    }

@router.delete("/history/{history_id}")
async def delete_history_item(
    history_id: str,
    current_user = Depends(get_current_active_user),
    db = Depends(get_database)
):
    try:
        obj_id = ObjectId(history_id)
    except:
        return {"status": "error", "message": "Invalid ID format"}
        
    await db["history"].delete_one({"_id": obj_id, "user_id": current_user["id"]})
    return {"status": "success"}
