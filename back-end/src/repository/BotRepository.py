from typing import List
from sqlalchemy import select, delete

from src.Users.models import User
from src.Order.models import Orders
from src.Promo.models import Promo
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
    async def get_check_link_user_with_bot(cls, chat_id: int) -> int | None:
        async with new_session() as session:
            query = select(User).where(User.chat_id == chat_id)
            result = await session.execute(query)
            user = result.scalar_one()

            return user.chat_id

    @classmethod
    async def get_all_orders(cls, chat_id: int) -> List[Orders] | None:
        async with new_session() as session:
            query = select(User.id).where(User.chat_id == chat_id)
            user_result = await session.execute(query)
            user_id = user_result.scalar_one()

            query = select(Orders).where(Orders.user_id == user_id)
            orders_result = await session.execute(query)
            orders = orders_result.scalars().all()
            return orders is not None

    @classmethod
    async def get_order_by_order_id(cls, order_id: int, chat_id: int) -> Orders | None:
        async with new_session() as session:
            query = select(User.id).where(User.chat_id == chat_id)
            user_result = await session.execute(query)
            user_id = user_result.scalar_one()

            query = select(Orders).where(Orders.user_id == user_id, Orders.id == order_id)
            order_result = await session.execute(query)
            order = order_result.scalar_one()
            return order is not None

    '''
    @classmethod
    async def delete_order(cls, order_id: int, chat_id: int) -> int:
        async with new_session() as session:
            query = select(User.id).where(User.chat_id == chat_id)
            user_result = await session.execute(query)
            user_id = user_result.scalar_one()

            query = delete(Orders).where(Orders.user_id == user_id, Orders.id == order_id)
            order_result = await session.execute(query)
            await session.commit()
            return 0
    '''

    @classmethod
    async def get_promo(cls) -> List[Promo] | None:
        async with new_session() as session:
            query = select(Promo).where(Promo.active == True, Promo.used == False)
            promo_result = await session.execute(query)
            promo = promo_result.scalar_one()
            return promo is not None
