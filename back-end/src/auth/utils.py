import jwt
from datetime import datetime, timedelta, timezone
from src.config import get_auth_data


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
