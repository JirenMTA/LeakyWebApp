import os
import sys
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import (
    create_async_engine,
    async_sessionmaker,
    AsyncSession,
)
from sqlalchemy.orm import DeclarativeBase

if os.getenv("DB_URL") is None:
    sys.exit("No DB connection string!")
db_engine = create_async_engine(os.getenv("DB_URL"))

new_session = async_sessionmaker(db_engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def create_tables():
    async with db_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def drop_tables():
    async with db_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_sessionmaker() as session:
        yield session
