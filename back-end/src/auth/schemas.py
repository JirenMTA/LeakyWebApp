from pydantic import BaseModel, EmailStr
from enum import Enum


class ResponseStatus(Enum):
    Ok = "Ok"
    Error = "Fail"


# TODO secure validation
class SSignIn(BaseModel):
    email: EmailStr
    password: str


class SLocalSignUp(BaseModel):
    username: str
    email: EmailStr
    password: str


class SResult(BaseModel):
    status: ResponseStatus
    error: str | None
