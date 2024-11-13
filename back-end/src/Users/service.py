from typing import List
from fastapi import HTTPException, status
from src.repository.UserRepository import UserRepository
from src.repository.RoleRepository import RoleRepository
from src.Users.schemas import SUserPriv, SUserPub
from src.Roles.service import SResult


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