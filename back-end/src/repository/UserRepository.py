from sqlalchemy import select
from sqlalchemy.orm import selectinload

from src.Users.models import User
from src.database import new_session


class UserRepository:
    @classmethod
    async def get_all(cls):
        async with new_session() as session:
            query = select(User)
            result = await session.execute(query)
            user_models = result.scalars().all()
            return user_models

    @classmethod
    async def get_one(cls, id: int):
        async with new_session() as session:
            query = select(User).where(User.id == id).options(selectinload(User.comments))
            result = await session.execute(query)
            user_model = result.unique().scalars().first()
            return user_model
