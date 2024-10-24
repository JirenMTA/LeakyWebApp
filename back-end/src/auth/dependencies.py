from fastapi import Request, HTTPException, status, Depends


def get_token(request: Request):
    token = request.cookies.get("auth")
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No access token")
    return token
