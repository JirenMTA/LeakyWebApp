from pydantic import BaseModel, EmailStr, ConfigDict
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
    error: str | None = None


class SAccessControl(BaseModel):
    id: int
    role: str | None = "customer"

    model_config = ConfigDict(from_attributes=True)
