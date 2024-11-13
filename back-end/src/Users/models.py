from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey

from src.database import Base
from src.Comments.models import Comment


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str | None]
    email: Mapped[str]
    hash: Mapped[str | None]
    is_external: Mapped[bool] = mapped_column(default=False)
    balance: Mapped[float] = mapped_column(default=15000.0)
    avatar: Mapped[str] = mapped_column(nullable=True)
    role_id: Mapped[int] = mapped_column(ForeignKey("roles.id"), default=1)
    second_factor_on: Mapped[bool] = mapped_column(default=False)
    second_factor_secret: Mapped[str] = mapped_column(nullable=True)

    role: Mapped["Roles"] = relationship()
    comments: Mapped[list["Comment"]] = relationship()
