from datetime import datetime, timedelta, timezone
from pyotp import TOTP
import jwt

from src.config import get_auth_data
from src.repository.UserRepository import UserRepository


def generate_cookie(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    auth_data = get_auth_data()
    encoded_jwt = jwt.encode(
        to_encode,
        key=auth_data["secret_key"],
        algorithm=auth_data["algorithm"],
    )
    return encoded_jwt


async def validate_token(user_id: int, token: str) -> bool:
    secret = await UserRepository.get_secret(user_id)
    totp = TOTP(secret)
    return totp.verify(token)
