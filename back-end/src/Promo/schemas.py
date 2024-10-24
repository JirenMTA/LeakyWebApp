from __future__ import annotations

from datetime import datetime
from enum import Enum
from pydantic import BaseModel, ConfigDict


class ResponseStatus(Enum):
    Ok = "Ok"
    Error = "Fail"


class SPromoAdd(BaseModel):
    code: str
    sale: int
    active: bool = False


class SPromoGet(BaseModel):
    id: int
    code: str
    sale: int
    active: bool
    created: datetime

    model_config = ConfigDict(from_attributes=True)


class SPromoEdit(BaseModel):
    id: int
    code: str
    sale: int
    active: bool


class SPromoDelete(BaseModel):
    id: int


class SResult(BaseModel):
    status: ResponseStatus
    error: str | None = None
    promo: SPromoGet | None = None
