from __future__ import annotations

from datetime import datetime
from enum import Enum
from pydantic import BaseModel, ConfigDict


class ResponseStatus(Enum):
    Ok = "Ok"
    Error = "Fail"


# TODO не принимать id автора, а доставать его из Cookie
class SCartAdd(BaseModel):
    user_id: int
    product_id: int
    amount: int


class SCartGet(BaseModel):
    id: int
    user_id: int
    product_id: int
    amount: int

    model_config = ConfigDict(from_attributes=True)


class SCartGetByUser(BaseModel):
    user_id: int
    product: SProductGetShort
    amount: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class SCartEdit(BaseModel):
    user_id: int
    product_id: int
    amount: int


class SCartDelete(BaseModel):
    user_id: int
    product_id: int


class SResult(BaseModel):
    status: ResponseStatus
    error: str | None = None
    cart: SCartGet | None = None


from src.Products.schemas import SProductGetShort

SCartGetByUser.model_rebuild()
