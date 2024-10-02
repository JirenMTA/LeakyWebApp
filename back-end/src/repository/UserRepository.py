from fastapi import Depends
from sqlalchemy import select

from src.users.models import User
from src.database import new_session
from src.database import AsyncSession, get_async_session


class UserRepository:
    @classmethod
    async def get_all(cls):
        async with new_session() as session:
            query = select(User)
            result = await session.execute(query)
            user_models = result.scalars().all()
            # TODO посмотреть что такое scalars
            return user_models
