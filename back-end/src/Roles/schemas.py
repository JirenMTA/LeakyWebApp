from __future__ import annotations

from enum import Enum
from pydantic import BaseModel, ConfigDict


class ResponseStatus(Enum):
    Ok = "Ok"
    Error = "Fail"


class SRoleAdd(BaseModel):
    name: str


class SRoleGet(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)


class SRoleEdit(BaseModel):
    id: int
    name: str


class SRoleDelete(BaseModel):
    id: int


class SResult(BaseModel):
    status: ResponseStatus
    error: str | None = None
    role: SRoleGet | None = None
