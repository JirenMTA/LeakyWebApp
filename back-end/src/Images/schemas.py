from pydantic import BaseModel
from enum import Enum


class ResponseStatus(Enum):
    Ok = "Ok"
    Error = "Fail"


class SResult(BaseModel):
    status: ResponseStatus
    error: str | None = None
    filename: str | None = None
