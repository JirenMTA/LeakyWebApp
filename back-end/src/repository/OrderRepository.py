from typing import List
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload, joinedload

from src.database import new_session
from src.Order.models import Orders
from src.Purchases.models import Purchases
from src.Products.models import Product
from src.Promo.models import Promo
from src.Users.models import User
from src.Order.schemas import SOrderCreate, SPayForOrder, SUsePromo


class OrderRepository:
    @classmethod
    async def get_orders_for_user(cls, id: int) -> List[Orders] | None:
        async with new_session() as session:
            query = (
                select(Orders)
                .where(Orders.user_id == id)
                .options(selectinload(Orders.purchases).joinedload(Purchases.product))
            )
            result = await session.execute(query)
            orders_models = result.unique().scalars().all()
            return orders_models

    @classmethod
    async def check_order_exist_for_user(cls, user_id: int, id: int) -> bool:
        async with new_session() as session:
            query = select(Orders).where(Orders.user_id == user_id, Orders.id == id)
            result = await session.execute(query)
            order = result.scalar_one()
            return order is not None

    @classmethod
    async def create_order(cls, user_id: int, data: SOrderCreate) -> Orders | None:
        async with new_session() as session:
            new_order = Orders(user_id=user_id, total_price=0.0)
            session.add(new_order)
            await session.flush()
            await session.commit()

            for product in data.products:
                new_purchase = Purchases(
                    product_id=product.product_id,
                    order_id=new_order.id,
                    amount=product.amount,
                    price=product.price,
                )
                session.add(new_purchase)
            await session.commit()
            total_price_query = (
                select(
                    func.sum(
                        Purchases.amount * Product.full_price * (100.0 - Product.sale) / 100.0
                    ).label("summary_price"),
                )
                .select_from(Purchases)
                .join(Product)
                .where(Purchases.order_id == new_order.id)
            )
            result = await session.execute(total_price_query)
            total_price = result.scalar_one()
            new_order.total_price = total_price
            await session.commit()
        return new_order

    @classmethod
    async def pay_for_order(cls, user_id: int, data: SPayForOrder) -> Orders | None:
        async with new_session() as session:
            query = select(Orders).where(Orders.id == data.order_id)
            result = await session.execute(query)
            order = result.scalar_one()

            query = select(User).where(User.id == user_id)
            user_result = await session.execute(query)
            user = user_result.scalar_one()
            user.balance -= order.total_price
            await session.flush()
            await session.commit()
            return order

    @classmethod
    async def use_promo_for_order(
        cls, user_id: int, order_id: int, promo_id: int
    ) -> Orders | None:
        async with new_session() as session:
            query = select(Promo).where(Promo.id == promo_id)
            result = await session.execute(query)
            promo = result.scalar_one()

            query = select(Orders).where(Orders.id == order_id, Orders.user_id == user_id)
            order_result = await session.execute(query)
            order = order_result.scalar_one()

            order.total_price -= promo.sale
            promo.used = True

            await session.flush()
            await session.commit()
            return order
