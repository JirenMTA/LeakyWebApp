from typing import List
from fastapi import HTTPException, status
from src.repository.UserRepository import UserRepository
from src.Users.schemas import SUserPriv


class UserService:
    @classmethod
    async def get_all(cls, pagination: dict) -> List[SUserPriv]:
        users = await UserRepository.get_all(pagination)
        user_schemas = [SUserPriv.model_validate(user) for user in users]
        return user_schemas

    @classmethod
    async def get_one_by_id(cls, id: int) -> SUserPriv:
        user = await UserRepository.get_one(id)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No such user!")

        user_schema = SUserPriv.model_validate(user)
        return user_schema
