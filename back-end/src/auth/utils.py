from typing import Tuple

import jwt
from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, status

from src.auth.dependencies import get_token
from src.repository import AuthRepository
from src.config import get_auth_data


def generate_cookie(data: dict) -> str:
    # TODO update func args
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


async def verify_cookie(cookie: str = Depends(get_token)):
    try:
        # TODO for vuln set verify_signature on False or use weak secret for cookies
        auth_data = get_auth_data()
        token = jwt.decode(
            cookie,
            auth_data["secret_key"],
            algorithms=[auth_data["algorithms"]],
            options={
                "require": ["id", "role", "exp"],
            },
        )
    except BaseException as ex:
        print(ex)
        return None, False
    user = await AuthRepository.get_user_by_id(int(token.get("id")))
    if not user:
        return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return user
