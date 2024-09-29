from pydantic import BaseModel, ConfigDict


# TODO secure validation
class SUserPub(BaseModel):
    username: str | None
    email: str


class SUserPriv(BaseModel):
    id: int
    username: str | None
    email: str
    hash: str | None  # TODO delete
    is_external: bool

    model_config = ConfigDict(from_attributes=True)


class SLocalUserAdd(BaseModel):
    username: str | None
    email: str
    hash: str  # TODO rename password


class SExternalUserAdd(BaseModel):
    email: str
