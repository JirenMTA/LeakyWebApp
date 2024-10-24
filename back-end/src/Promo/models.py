import datetime
from sqlalchemy import ForeignKey, text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Annotated

from src.database import Base

created_at = Annotated[
    datetime.datetime,
    mapped_column(server_default=text("TIMEZONE('utc', now())")),
]


class Promo(Base):
    __tablename__ = "promo"
    id: Mapped[int] = mapped_column(primary_key=True)
    code: Mapped[str] = mapped_column(unique=True)
    sale: Mapped[int]
    active: Mapped[bool] = mapped_column(default=False)
    created: Mapped[created_at]
