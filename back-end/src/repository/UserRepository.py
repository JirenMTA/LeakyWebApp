from sqlalchemy import select

from src.database import new_session
from src.users.models import User


class UserRepository:
    @classmethod
    async def get_all(cls):
        async with new_session() as session:
            query = select(User)
            result = await session.execute(query)
            user_models = (
                result.scalars().all()
            )  # TODO посмотреть что такое scalars
            return user_models
