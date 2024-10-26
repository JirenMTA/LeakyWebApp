import jwt
from fastapi import Request, HTTPException, status, Depends

from src.config import get_auth_data
from src.repository.AuthRepository import AuthRepository
from src.auth.schemas import SAccessControl


def get_token(request: Request):
    token = request.cookies.get("auth")
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No access token")
    return token


async def verify_cookie(cookie: str = Depends(get_token)) -> SAccessControl:
    try:
        # TODO for vuln set verify_signature on False or use weak secret for cookies
        auth_data = get_auth_data()
        decoded = jwt.decode(
            cookie,
            auth_data["secret_key"],
            algorithms=[auth_data["algorithm"]],
            options={
                "require": ["id", "role", "exp"],
            },
        )
    except BaseException as ex:
        print(ex)
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

    user = await AuthRepository.get_user_by_id(int(decoded.get("id")))
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return SAccessControl.validate(user)
