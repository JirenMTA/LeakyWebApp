from typing import List, Annotated
from fastapi import APIRouter, Depends

from src.Users.schemas import SUserPriv, SUserPub
from src.Users.service import UserService
from src.Users.dependencies import user_paginator, user_access_control

router = APIRouter(prefix="/users", tags=["Пользователи"])


@router.get("")
async def get_users(pagination: Annotated[dict, Depends(user_paginator)]) -> List[SUserPub]:
    users = await UserService.get_all(pagination)
    return users


@router.get("/{id}")
async def get_user(
    id: int, access: Annotated[bool, Depends(user_access_control)]
) -> SUserPriv:
    user = await UserService.get_one_by_id(id)
    return user
