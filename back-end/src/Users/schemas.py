from pydantic import BaseModel, ConfigDict, EmailStr


# TODO secure validation
class SUserPub(BaseModel):
    username: str | None
    email: EmailStr

    model_config = ConfigDict(from_attributes=True)


class SUserPriv(BaseModel):
    id: int
    username: str | None
    email: EmailStr
    balance: float
    is_external: bool

    model_config = ConfigDict(from_attributes=True)


class SLocalUserAdd(BaseModel):
    username: str | None
    email: EmailStr


class SExternalUserAdd(BaseModel):
    email: EmailStr
