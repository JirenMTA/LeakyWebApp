from typing import List

from pycparser.ply.yacc import resultlimit
from sqlalchemy import select, delete

from src.Products.models import Product
from src.Users.models import User
from src.Order.models import Orders
from src.Promo.models import Promo
from src.Purchases.models import Purchases
from src.database import new_session


class BotRepository:
    @classmethod
    async def link_chat_id_with_user(cls, email: str, chat_id: int) -> int:
        async with new_session() as session:
            query = select(User).where(User.email == email)
            result = await session.execute(query)
            user = result.scalar_one()

            user.chat_id = chat_id
            await session.flush()
            await session.commit()
            return user.chat_id

    @classmethod
    async def unlink_chat_id_with_user(cls, chat_id: int) -> bool:
        async with new_session() as session:
            query = select(User).where(User.chat_id == chat_id)
            result = await session.execute(query)
            user = result.scalar_one()

            user.chat_id = None
            await session.flush()
            await session.commit()
            return True

    @classmethod
    async def get_chat_id(cls, user_id: int) -> int | None:
        async with new_session() as session:
            query = select(User.chat_id).where(User.id == user_id)
            result = await session.execute(query)
            chat_id = result.scalar_one()

            return chat_id

    @classmethod
    async def get_all_chats_id(cls) -> List[int]:
        async with new_session() as session:
            query = select(User.chat_id).where(User.chat_id != None)
            result = await session.execute(query)
            chats_id = result.scalars().all()

            return chats_id

    @classmethod
    async def get_check_link_user_with_bot(cls, chat_id: int) -> int:
        async with new_session() as session:
            query = select(User).where(User.chat_id == chat_id)
            result = await session.execute(query)
            user = result.scalars().all()

            if len(user) == 0:
                return -1
            return user[0].chat_id

    @classmethod
    async def get_all_orders(cls, chat_id: int) -> List[Orders] | None:
        async with new_session() as session:
            query = select(User.id).where(User.chat_id == chat_id)
            user_result = await session.execute(query)
            user_id = user_result.scalar_one()

            query = select(Orders).where(Orders.user_id == user_id)
            orders_result = await session.execute(query)
            orders = orders_result.scalars().all()
            return orders

    @classmethod
    async def get_order_by_order_id(cls, order_id: int, chat_id: int):
        async with new_session() as session:
            query = select(User.id).where(User.chat_id == chat_id)
            user_result = await session.execute(query)
            user_id = user_result.scalar_one()

            query = select(Orders).where(Orders.user_id == user_id, Orders.id == order_id)
            order_result = await session.execute(query)
            order = order_result.scalars().all()
            if len(order) == 0:
                return None, None

            query = select(Purchases).where(Purchases.order_id == order_id)
            purchases_result = await session.execute(query)
            purchases = purchases_result.scalars().all()
            if len(purchases) == 0:
                return None, None
            return order[0], purchases

    @classmethod
    async def get_product_by_id(cls, product_id: int) -> Product | None:
        async with new_session() as session:
            query = select(Product).where(Product.id == product_id)
            product_result = await session.execute(query)
            product = product_result.scalars().all()

            if len(product) == 0:
                return None

            return product[0]

    @classmethod
    async def get_promo(cls) -> List[Promo] | None:
        async with new_session() as session:
            query = select(Promo).where(Promo.active == True, Promo.used == False)
            promo_result = await session.execute(query)
            promo = promo_result.scalars().all()
            return promo