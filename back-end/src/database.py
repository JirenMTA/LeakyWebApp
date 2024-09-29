from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

db_engine = create_async_engine(
    "postgresql+asyncpg://Artem:LEAKYWEBAPPARTEMPASS@192.168.3.80:5432/LeakyWebApp"
)

new_session = async_sessionmaker(db_engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def create_tables():
    async with db_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def drop_tables():
    async with db_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
