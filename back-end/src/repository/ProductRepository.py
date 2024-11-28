from sqlalchemy import select, update, text
from sqlalchemy.orm import selectinload
from sqlalchemy.sql import func

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
    async def find_products(cls, param: str):
        async with new_session() as session:
            # query = f"select * from products where name like '%{param}%' limit 5"
            query = select(Product).where(Product.name.like(f"%{param}%")).limit(5)
            data = await session.execute(query)
            result = data.scalars().all()
            return result

    @classmethod
    async def get_one(cls, id: int) -> Product | None:
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
            product_id = await session.execute(query)
            result = product_id.unique().scalars().first()
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

    @classmethod
    async def update_average_mark(cls, id: int) -> float:
        async with new_session() as session:
            query = select(func.avg(Comment.mark).label("average")).filter(
                Comment.product_id == id
            )
            result = await session.execute(query)
            new_rating = result.scalars().first()
            update_query = update(Product).where(Product.id == id).values(rating=new_rating)
            await session.execute(update_query)
            await session.commit()
            return new_rating

    @classmethod
    async def set_image(cls, id: int, filename: str) -> str:
        async with new_session() as session:
            query = (
                select(Product)
                .where(Product.id == id)
                .options(selectinload(Product.comments).joinedload(Comment.author))
            )
            result = await session.execute(query)
            product_model = result.unique().scalars().first()
            product_model.image = filename
            await session.flush()
            await session.commit()
            return product_model.image
