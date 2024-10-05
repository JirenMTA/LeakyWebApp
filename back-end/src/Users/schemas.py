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
    hash: str | None  # TODO delete
    is_external: bool

    model_config = ConfigDict(from_attributes=True)


class SLocalUserAdd(BaseModel):
    username: str | None
    email: EmailStr
    hash: str  # TODO rename password


class SExternalUserAdd(BaseModel):
    email: EmailStr
