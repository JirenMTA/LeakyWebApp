from pydantic import BaseModel, ConfigDict, EmailStr
from enum import Enum


class ResponseStatus(Enum):
    Ok = "Ok"
    Error = "Fail"


# TODO secure validation
class SUserPub(BaseModel):
    username: str | None
    email: EmailStr
    avatar: str | None = None

    model_config = ConfigDict(from_attributes=True)


class SUserPriv(BaseModel):
    id: int
    username: str | None
    email: EmailStr
    balance: float
    is_external: bool
    avatar: str | None = None

    model_config = ConfigDict(from_attributes=True)


class SLocalUserAdd(BaseModel):
    username: str | None
    email: EmailStr


class SExternalUserAdd(BaseModel):
    email: EmailStr


class SResult(BaseModel):
    status: ResponseStatus
    error: str | None = None
