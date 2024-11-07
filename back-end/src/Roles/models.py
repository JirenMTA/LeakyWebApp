from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database import Base


class Roles(Base):
    __tablename__ = "roles"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
