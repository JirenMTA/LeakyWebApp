from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.database import create_tables, drop_tables
from src.auth.router import router as auth_router
from src.Users.router import router as user_router
from src.Products.router import router as product_router
from src.Comments.router import router as comment_router
from src.Cart.router import router as cart_router
from src.Promo.router import router as promo_router
<<<<<<< HEAD
from fastapi.middleware.cors import CORSMiddleware
=======
from src.Roles.router import router as role_router
from src.Order.router import router as order_router
>>>>>>> back-end


@asynccontextmanager
async def lifespan(app: FastAPI):
    await drop_tables()
    print("База данных очищена")
    await create_tables()
    print("База данных готова к работе")
    yield
    print("Приложение выключено!")

app = FastAPI(title="Leaky Web App")
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(product_router)
app.include_router(comment_router)
app.include_router(cart_router)
app.include_router(promo_router)
app.include_router(role_router)
app.include_router(order_router)
