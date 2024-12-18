from typing import List
from sqlalchemy import select
from sqlalchemy.orm import selectinload, joinedload

from src.Users.models import User
from src.database import new_session


class UserRepository:
    @classmethod
    async def get_all(cls, pagination_params: dict) -> List[User]:
        async with new_session() as session:
            query = (
                select(User)
                .offset(pagination_params["skip"])
                .limit(pagination_params["limit"])
            )
            result = await session.execute(query)
            user_models = result.scalars().all()
            return user_models

    @classmethod
    async def get_one(cls, id: int) -> User:
        async with new_session() as session:
            query = (
                select(User)
                .where(User.id == id)
                .options(joinedload(User.role))
                .options(selectinload(User.comments))
            )
            result = await session.execute(query)
            user_model = result.unique().scalars().first()
            return user_model

    @classmethod
    async def set_avatar(cls, id: int, filename: str) -> str:
        async with new_session() as session:
            query = select(User).where(User.id == id)
            result = await session.execute(query)
            user = result.scalar_one()

            user.avatar = filename
            await session.flush()
            await session.commit()
            return user.avatar

    @classmethod
    async def update_role(cls, id: int, role_id: int) -> str:
        async with new_session() as session:
            query = select(User).where(User.id == id).options(joinedload(User.role))
            result = await session.execute(query)
            user = result.scalar_one()

            user.role_id = role_id
            await session.flush()
            await session.commit()
            return user.role.name

    @classmethod
    async def second_factor_on(cls, id: int) -> bool:
        async with new_session() as session:
            user = await session.get(User, id)
            return user.second_factor_on

    @classmethod
    async def get_secret(cls, id: int) -> str | None:
        async with new_session() as session:
            user = await session.get(User, id)
            return user.second_factor_secret

    @classmethod
    async def set_secret(cls, id: int, secret: str) -> str:
        async with new_session() as session:
            query = select(User).where(User.id == id)
            result = await session.execute(query)
            user = result.scalar_one()

            user.second_factor_secret = secret
            await session.flush()
            await session.commit()
            return user.second_factor_secret

    @classmethod
    async def setup_2fa(cls, id: int) -> bool:
        async with new_session() as session:
            query = select(User).where(User.id == id)
            result = await session.execute(query)
            user = result.scalar_one()

            user.second_factor_on = True
            await session.flush()
            await session.commit()
            return user.second_factor_on
