from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database import Base


class Product(Base):
    __tablename__ = "products"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    description: Mapped[str]
    full_price: Mapped[float]
    amount: Mapped[int] = mapped_column(default=0)
    sale: Mapped[float] = mapped_column(default=0.0)
    rating: Mapped[float] = mapped_column(default=5.0)
    image: Mapped[str] = mapped_column(nullable=True)

    comments: Mapped[list["Comment"]] = relationship()
