from __future__ import annotations

from datetime import datetime
from pydantic import BaseModel, ConfigDict


class SPurchaseCreateFromCart(BaseModel):
    cart_id: int
    amount: int


class SPurchaseCreate(BaseModel):
    product_id: int
    amount: int
    price: float


class SPurchaseGet(BaseModel):
    id: int
    product: SProductGetShort
    amount: int
    price: float

    model_config = ConfigDict(from_attributes=True)


from src.Products.schemas import SProductGetShort

SPurchaseGet.model_rebuild()
