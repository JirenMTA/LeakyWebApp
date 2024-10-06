import jwt
from datetime import datetime, timedelta, timezone


def generate_cookie(id: int, role: str, secret: str) -> str:
    # TODO update func args
    cookie = jwt.encode(
        {
            "id": id,
            "role": role,
            "exp": datetime.utcnow() + timedelta(minutes=30),
        },
        key=secret,
        algorithm="HS256",
    )
    return cookie


def verify_cookie(cookie: str, secret: str) -> int | None:
    try:
        # TODO for vuln set verify_signature on False or use weak secret for cookies
        # cookie_data = jwt.decode(cookie, options={"verify_signature": True})["id"]
        token = jwt.decode(
            cookie,
            secret,
            algorithms=["HS256"],
            options={
                "require": ["id", "role", "exp"],
            },
        )
        return token["id"]
    except BaseException as ex:
        print(ex)
        return None
