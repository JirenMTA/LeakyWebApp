from typing import List

import pyotp
from fastapi import HTTPException, status
from src.repository.UserRepository import UserRepository
from src.repository.RoleRepository import RoleRepository
from src.Users.schemas import SUserPriv, SUserPub
from src.Roles.service import SResult
from pyotp import totp


class UserService:
    @classmethod
    async def get_all(cls, pagination: dict) -> List[SUserPub]:
        users = await UserRepository.get_all(pagination)
        user_schemas = [SUserPub.model_validate(user) for user in users]
        return user_schemas

    @classmethod
    async def get_one_by_id(cls, id: int) -> SUserPriv:
        user = await UserRepository.get_one(id)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No such user!")

        user_schema = SUserPriv.model_validate(user)
        return user_schema

    @classmethod
    async def update_role(cls, user_id: int, role_id: int) -> SResult:
        role = await RoleRepository.check_role_exists(role_id)
        if not role:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No such role!")
        new_role = await UserRepository.update_role(user_id, role_id)
        if not new_role:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No such user!")

        return SResult(status="Ok", role=role)

    @classmethod
    async def generate_uri(cls, user_id: int) -> str | None:
        second_factor_on = await UserRepository.second_factor_on(user_id)
        if second_factor_on:
            return None
        secret = pyotp.random_base32()
        created_secret = await UserRepository.set_secret(user_id, secret)
        user = await UserRepository.get_one(user_id)
        uri = totp.TOTP(created_secret).provisioning_uri(
            name=user.username, issuer_name="Leaky Web App"
        )

        return uri

    @classmethod
    async def setup_2fa(cls, user_id: int) -> SResult:
        second_factor_on = await UserRepository.second_factor_on(user_id)
        if second_factor_on:
            return SResult(status="Fail", error="2FA уже подключен!")
        secret = await UserRepository.get_secret(user_id)
        if not secret:
            return SResult(status="Fail", error="Сначала необходимо получить QR код")

        await UserRepository.setup_2fa(user_id)
        return SResult(status="Ok")
