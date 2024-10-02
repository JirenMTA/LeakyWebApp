from sqlalchemy.orm import Mapped, mapped_column
from src.database import Base


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str | None]
    email: Mapped[str]
    hash: Mapped[str | None]
    is_external: Mapped[bool] = mapped_column(default=False)
