from __future__ import annotations

from datetime import datetime
from enum import Enum
from pydantic import BaseModel, ConfigDict


class ResponseStatus(Enum):
    Ok = "Ok"
    Error = "Fail"


# TODO не принимать id автора, а доставать его из Cookie
class SCartAdd(BaseModel):
    product_id: int
    amount: int


class SCartGet(BaseModel):
    product_id: int
    amount: int

    model_config = ConfigDict(from_attributes=True)


class SCartGetByUserObj(BaseModel):
    product: SProductGetShort
    amount: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class SCartGetByUserFull(BaseModel):
    products: list[SCartGetByUserObj]
    total_products: int = 0
    total_price: float = 0.0


class SCartEdit(BaseModel):
    product_id: int
    amount: int


class SCartDelete(BaseModel):
    product_id: int


class SResult(BaseModel):
    status: ResponseStatus
    error: str | None = None
    cart: SCartGet | None = None


from src.Products.schemas import SProductGetShort

SCartGetByUserObj.model_rebuild()
