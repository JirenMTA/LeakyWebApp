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


async def pre_auth(cookie: str = Depends(get_token)) -> SAccessControl:
    try:
        # TODO for vuln set verify_signature on False or use weak secret for cookies
        auth_data = get_auth_data()
        decoded = jwt.decode(
            cookie,
            auth_data["secret_key"],
            algorithms=[auth_data["algorithm"]],
            options={
                "require": ["id", "role", "type", "exp"],
            },
        )
    except BaseException as ex:
        print(ex)
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

    user = await AuthRepository.get_user_by_id(int(decoded.get("id")))
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return_val = SAccessControl.validate(user)
    return_val.validated = decoded.get("type") == "auth"
    return return_val


async def verify_cookie(
    access_control_obj: SAccessControl = Depends(pre_auth),
) -> SAccessControl:
    if access_control_obj.second_factor_on and not access_control_obj.validated:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return access_control_obj


async def admin_required(
    access_control_obj: SAccessControl = Depends(verify_cookie),
) -> SAccessControl:
    if access_control_obj.role.name != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    return access_control_obj
