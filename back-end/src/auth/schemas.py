from pydantic import BaseModel, EmailStr, ConfigDict
from enum import Enum
from src.Roles.schemas import SRoleGet


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
    id: int | None = None
    second_factor_required: bool = False


class SAccessControl(BaseModel):
    id: int
    role: SRoleGet | None
    validated: bool = False
    second_factor_on: bool = False

    model_config = ConfigDict(from_attributes=True)
