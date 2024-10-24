from __future__ import annotations

from datetime import datetime
from enum import Enum
from pydantic import BaseModel, ConfigDict


class ResponseStatus(Enum):
    Ok = "Ok"
    Error = "Fail"


# TODO не принимать id автора, а доставать его из Cookie
class SCommentAdd(BaseModel):
    author_id: int
    product_id: int
    mark: float
    comment: str


class SCommentGetByProduct(BaseModel):
    id: int
    author: SUserPub
    mark: float
    comment: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class SCommentGetByUser(BaseModel):
    id: int
    product: SProductGetShort
    mark: float
    comment: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class SResult(BaseModel):
    status: ResponseStatus
    error: str | None = None


from src.Users.schemas import SUserPub
from src.Products.schemas import SProductGetShort

SCommentGetByProduct.model_rebuild()
SCommentGetByUser.model_rebuild()
