from sqlalchemy import select

from src.database import new_session
from src.auth.schemas import SLocalSignUp
from src.users.models import User

from werkzeug.security import generate_password_hash


class AuthRepository:
    @classmethod
    async def get_user_by_email(cls, email: str) -> User | None:
        async with new_session() as session:
            query = select(User).where(User.email == email)
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
            )  # TODO Подумать над тем, чтобы не генерировать хэш непосрественно в репозитории
            session.add(user)
            await session.flush()
            await session.commit()
            return user
