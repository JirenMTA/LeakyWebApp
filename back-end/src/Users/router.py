from typing import List
from fastapi import APIRouter
from src.Users.schemas import SUserPriv
from src.repository.UserRepository import UserRepository

router = APIRouter(prefix="/users", tags=["Пользователи"])


@router.get("")
async def get_users() -> List[SUserPriv]:
    users = await UserRepository.get_all()
    user_schemas = [SUserPriv.model_validate(user) for user in users]
    return user_schemas
