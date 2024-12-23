from sqlalchemy import select
from sqlalchemy.orm import joinedload
from werkzeug.security import generate_password_hash

from src.database import new_session
from src.auth.schemas import SLocalSignUp
from src.Users.models import User


class AuthRepository:
    @classmethod
    async def get_user_by_id(cls, id: int) -> User | None:
        async with new_session() as session:
            query = select(User).where(User.id == id).options(joinedload(User.role))
            result = await session.execute(query)
            result = result.scalars().first()
            return result

    @classmethod
    async def get_user_by_email(cls, email: str) -> User | None:
        async with new_session() as session:
            query = select(User).where(User.email == email).options(joinedload(User.role))
            result = await session.execute(query)
            result = result.scalars().first()
            return result

    @classmethod
    async def local_register(cls, data: SLocalSignUp) -> User | None:
        async with new_session() as session:
            user = User(
                username=data.username,
                email=data.email,
                hash=generate_password_hash(data.password),
            )
            session.add(user)
            await session.flush()
            await session.commit()
            return user
