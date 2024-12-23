from __future__ import annotations

from pydantic import BaseModel, ConfigDict
from enum import Enum


class ResponseStatus(Enum):
    Ok = "Ok"
    Error = "Fail"


class SProductAdd(BaseModel):
    name: str
    description: str
    full_price: float
    amount: int | None = None
    sale: float | None = None


class SProductGetShort(BaseModel):
    id: int
    name: str
    description: str
    full_price: float
    sale: float
    rating: float
    image: str | None = None

    model_config = ConfigDict(from_attributes=True)


class SProductGetFull(BaseModel):
    id: int
    name: str
    description: str
    full_price: float
    amount: int
    sale: float
    rating: float
    image: str | None = None
    comments: list[SCommentGetByProduct] | None = None

    model_config = ConfigDict(from_attributes=True)


class SResult(BaseModel):
    status: ResponseStatus
    error: str | None = None
    product: SProductGetShort | None = None


from src.Comments.schemas import SCommentGetByProduct

SProductGetFull.update_forward_refs()
