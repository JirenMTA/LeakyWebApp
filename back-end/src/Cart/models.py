import datetime
from sqlalchemy import ForeignKey, text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Annotated

from src.database import Base

cart_add_time = Annotated[
    datetime.datetime,
    mapped_column(server_default=text("TIMEZONE('utc', now())")),
]

cart_update_time = Annotated[
    datetime.datetime,
    mapped_column(server_default=text("TIMEZONE('utc', now())")),
]


# TODO may be add price of product for bug
class Cart(Base):
    __tablename__ = "Cart"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"))
    amount: Mapped[int]
    created_at: Mapped[cart_add_time]
    updated_at: Mapped[cart_update_time]

    user: Mapped["User"] = relationship()
    product: Mapped["Product"] = relationship()
