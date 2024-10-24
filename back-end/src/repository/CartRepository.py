from typing import List, Tuple
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from sqlalchemy.sql import func

from src.database import new_session
from src.Cart.models import Cart
from src.Cart.schemas import SCartAdd, SCartEdit, SCartDelete
from src.Products.models import Product


class CartRepository:
    @classmethod
    async def get_all_for_user(cls, id: int) -> List[Cart]:
        async with new_session() as session:
            query = select(Cart).where(Cart.user_id == id).options(joinedload(Cart.product))
            result = await session.execute(query)
            cart_models = result.scalars().all()
            return cart_models

    @classmethod
    async def get_cart_if_exists(cls, user_id: int, product_id: int) -> Cart | None:
        async with new_session() as session:
            query = select(Cart).where(Cart.user_id == user_id, Cart.product_id == product_id)
            result = await session.execute(query)
            cart_models = result.scalars().first()
            return cart_models

    @classmethod
    async def get_summary(cls, user_id) -> Tuple[int, float]:
        async with new_session() as session:
            query = (
                select(
                    func.sum(Cart.amount).label("count_products"),
                    func.sum(Cart.amount * Product.full_price).label("summary_price"),
                )
                .select_from(Cart)
                .join(Product, Cart.product_id == Product.id)
                .where(Cart.user_id == user_id)
            )
            result = await session.execute(query)
            data = result.all()
            return data

    @classmethod
    async def add_cart(cls, data: SCartAdd) -> Cart:
        async with new_session() as session:
            cart = Cart(user_id=data.user_id, product_id=data.product_id, amount=data.amount)
            session.add(cart)
            await session.flush()
            await session.commit()
            return cart

    @classmethod
    async def edit_cart(cls, data: SCartEdit) -> Cart:
        async with new_session() as session:
            query = select(Cart).where(
                Cart.user_id == data.user_id, Cart.product_id == data.product_id
            )
            result = await session.execute(query)
            cart = result.scalar_one()
            cart.amount = data.amount
            await session.flush()
            await session.commit()
            return cart

    @classmethod
    async def delete_cart(cls, data: SCartDelete) -> bool:
        async with new_session() as session:
            query = select(Cart).where(
                Cart.user_id == data.user_id, Cart.product_id == data.product_id
            )
            result = await session.execute(query)
            cart = result.scalar_one()
            await session.delete(cart)
            await session.commit()
            return True
