from typing import Annotated
from fastapi import Depends, HTTPException, status

from src.auth.dependencies import verify_cookie
from src.auth.schemas import SAccessControl


async def user_paginator(skip: int = 0, limit: int = 20) -> dict:
    if limit > 50:
        limit = 50  # to avoid DOS
    return {"skip": skip, "limit": limit}


async def user_access_control(
    id: int, curr_user: Annotated[SAccessControl, Depends(verify_cookie)]
) -> bool:
    if id == curr_user.id or curr_user.role == "admin":
        return True

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN, detail="You can't see this account data!"
    )
