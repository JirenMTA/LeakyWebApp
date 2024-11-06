from __future__ import annotations

from datetime import datetime
from enum import Enum
from pydantic import BaseModel, ConfigDict


class ResponseStatus(Enum):
    Ok = "Ok"
    Error = "Fail"


class SOrderCreate(BaseModel):
    products: list[SPurchaseCreate]


class SOrderCreateFromFont(BaseModel):
    products: list[SPurchaseCreateFromCart]


class SOrderGet(BaseModel):
    id: int
    purchases: list[SPurchaseGet] | None = None
    ordered_at: datetime
    total_price: float
    paid: bool

    model_config = ConfigDict(from_attributes=True)


class SOrderGetShort(BaseModel):
    id: int
    ordered_at: datetime
    total_price: float
    paid: bool

    model_config = ConfigDict(from_attributes=True)


class SPayForOrder(BaseModel):
    order_id: int
    amount: float


class SUsePromo(BaseModel):
    order_id: int
    promo: str


class SResult(BaseModel):
    status: ResponseStatus
    error: str | None = None
    order: SOrderGetShort | None = None


from src.Purchases.schemas import SPurchaseCreate, SPurchaseGet, SPurchaseCreateFromCart

SOrderGet.model_rebuild()
