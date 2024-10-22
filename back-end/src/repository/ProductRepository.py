from sqlalchemy import select
from sqlalchemy.orm import selectinload, joinedload

from src.Products.models import Product
from src.Products.schemas import SProductAdd
from src.Comments.models import Comment
from src.database import new_session


class ProductRepository:
    @classmethod
    async def get_all(cls):
        async with new_session() as session:
            query = select(Product)
            result = await session.execute(query)
            product_models = result.scalars().all()
            return product_models

    @classmethod
    async def get_one(cls, id: int):
        async with new_session() as session:
            query = (
                select(Product)
                .where(Product.id == id)
                .options(selectinload(Product.comments).joinedload(Comment.author))
            )
            result = await session.execute(query)
            product_model = result.unique().scalars().first()
            return product_model

    @classmethod
    async def check_exists(cls, id: int) -> bool:
        async with new_session() as session:
            query = select(Product).where(Product.id == id)
            result = await session.execute(query).first()
            return result is not None

    @classmethod
    async def add_product(cls, data: SProductAdd) -> Product | None:
        async with new_session() as session:
            product = Product(
                name=data.name,
                description=data.description,
                full_price=data.full_price,
                amount=data.amount,
                sale=data.sale,
            )
            session.add(product)
            await session.flush()
            await session.commit()
            return product
