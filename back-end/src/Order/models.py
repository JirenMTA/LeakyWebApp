import datetime
from sqlalchemy import ForeignKey, text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Annotated

from src.database import Base

order_create_time = Annotated[
    datetime.datetime,
    mapped_column(server_default=text("TIMEZONE('utc', now())")),
]


class Orders(Base):
    __tablename__ = "orders"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    ordered_at: Mapped[order_create_time]
    total_price: Mapped[float] = mapped_column(default=0.0)
    paid: Mapped[bool] = mapped_column(default=False)

    user: Mapped["User"] = relationship()
    purchases: Mapped[list["Purchases"]] = relationship()
