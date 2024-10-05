from __future__ import annotations

from pydantic import BaseModel, ConfigDict
from enum import Enum


class ResponseStatus(Enum):
    Ok = "Ok"
    Error = "Fail"


# TODO Мб стоит хранить еще сложную категорию товаров и что-то еще
class SProductAdd(BaseModel):
    name: str
    description: str
    full_price: float
    amount: int | None = None
    sale: float | None = None


class SProductGetShort(BaseModel):
    name: str
    description: str
    full_price: float
    sale: float
    rating: float

    model_config = ConfigDict(from_attributes=True)


class SProductGetFull(BaseModel):
    id: int
    name: str
    description: str
    full_price: float
    amount: int
    sale: float
    rating: float
    comments: list[SCommentGetByProduct] | None = None

    model_config = ConfigDict(from_attributes=True)


class SResult(BaseModel):
    status: ResponseStatus
    error: str | None = None
    product: SProductGetShort | None = None


# TODO добавить статистку продаж товара
# class SProductGetStat(BaseModel):
#    status: ResponseStatus
#    error: str | None

from src.Comments.schemas import SCommentGetByProduct

SProductGetFull.update_forward_refs()
