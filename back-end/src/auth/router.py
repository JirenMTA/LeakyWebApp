from typing import Annotated
from fastapi import APIRouter, Response, Depends
from src.auth.utils import generate_cookie
from werkzeug.security import check_password_hash

from src.auth.schemas import SSignIn, SLocalSignUp, SResult, SAccessControl
from src.auth.dependencies import verify_cookie
from src.repository.AuthRepository import AuthRepository

router = APIRouter(prefix="/auth", tags=["Авторизация"])

# TODO create module for application settings


@router.post("/sign_up", response_model=SResult)
async def sign_up(data: SLocalSignUp) -> SResult:
    user = await AuthRepository.local_register(data)

    if user is None:  # TODO Более понятная обработка ошибок
        return SResult(status="Fail", error="Failed to add user")

    return SResult(status="Ok")


@router.post("/sign_in", response_model=SResult, response_model_exclude_unset=True)
async def sign_in(data: SSignIn, response: Response) -> SResult:
    user = await AuthRepository.get_user_by_email(data.email)

    if user is None:
        return SResult(status="Fail", error="Invalid username or password")

    if not check_password_hash(user.hash, data.password):
        return SResult(status="Fail", error="Invalid username or password")

    cookie = generate_cookie({"id": user.id, "role": "admin"})
    response.set_cookie(key="auth", value=cookie, httponly=True, samesite="strict")

    return SResult(status="Ok")


@router.get("/logout", response_model=SResult, response_model_exclude_unset=True)
async def logout(response: Response):
    response.delete_cookie("auth")
    return SResult(status="Ok")


"""
Test functionality of dependencies to fix IDOR
"""

# @router.get("/test")
# async def read_items(commons: Annotated[dict, Depends(common_parameters)]):
#    return commons
