from fastapi import FastAPI
from contextlib import asynccontextmanager

from src.database import create_tables, drop_tables
from src.auth.router import router as auth_router
from src.Users.router import router as user_router
from src.Products.router import router as product_router
from src.Comments.router import router as comment_router
<<<<<<< HEAD
from fastapi.middleware.cors import CORSMiddleware
=======
from src.Cart.router import router as cart_router
>>>>>>> back-end


# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     pass
    # await drop_tables()
    # print("База данных очищена")
    # await create_tables()
    # print("База данных готова к работе")
    # yield
    # print("Приложение выключено!")
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


app = FastAPI(title="Leaky Web App")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Đảm bảo domain này là đúng
    allow_credentials=True,                   # Cho phép cookie/credentials
    allow_methods=["*"],                      # Cho phép tất cả phương thức
    allow_headers=["*"],                      # Cho phép tất cả headers
)
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(product_router)
app.include_router(comment_router)
app.include_router(cart_router)
