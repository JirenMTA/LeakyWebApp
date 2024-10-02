from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.database import create_tables, drop_tables
from src.auth.router import router as auth_router
from src.users.router import router as user_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await drop_tables()
    print("База данных очищена")
    await create_tables()
    print("База данных готова к работе")
    yield
    print("Приложение выключено!")


app = FastAPI(title="Leaky Web App", lifespan=lifespan)
app.include_router(auth_router)
app.include_router(user_router)
