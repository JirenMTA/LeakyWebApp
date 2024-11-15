from typing import List, Annotated
from fastapi import APIRouter, Depends, Response
import qrcode
from io import BytesIO

from src.auth.schemas import SAccessControl
from src.auth.dependencies import verify_cookie
from src.Users.schemas import SUserPriv, SUserPub, SResult
from src.Users.service import UserService
from src.Users.dependencies import user_paginator, user_access_control

router = APIRouter(prefix="/users", tags=["Пользователи"])


@router.get(
    "/qr_generator", responses={200: {"content": {"image/png": {}}}}, response_class=Response
)
async def qr_generator(access_schema: Annotated[SAccessControl, Depends(verify_cookie)]):
    uri = await UserService.generate_uri(access_schema.id)
    if not uri:
        return SResult(status="Fail", error="2FA уже подключен")
    qr = qrcode.make(uri)
    buf = BytesIO()
    qr.save(buf, format="PNG")
    raw_bytes = buf.getvalue()
    return Response(content=raw_bytes, media_type="image/png")


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


@router.post("/setup_2fa")
async def setup_second_factor(
    access_schema: Annotated[SAccessControl, Depends(verify_cookie)]
):
    resp = await UserService.setup_2fa(access_schema.id)
    return resp
