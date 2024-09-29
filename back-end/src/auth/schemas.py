from pydantic import BaseModel


# TODO secure validation
class SSignIn(BaseModel):
    email: str
    password: str


class SLocalSignUp(BaseModel):
    username: str
    email: str
    password: str


class SResult(BaseModel):
    status: str
    error: str | None = None

    class Config:
        exclude_none = True
