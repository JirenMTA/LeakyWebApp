from typing import List
from sqlalchemy import select

from src.database import new_session
from src.Promo.models import Promo
from src.Promo.schemas import SPromoAdd, SPromoEdit, SPromoDelete


class PromoRepository:
    @classmethod
    async def get_all(cls) -> List[Promo]:
        async with new_session() as session:
            query = select(Promo)
            result = await session.execute(query)
            cart_models = result.unique().scalars().all()
            return cart_models

    @classmethod
    async def check_promo_exists(cls, id: int) -> bool:
        async with new_session() as session:
            promo = await session.get(Promo, id)
            return promo is not None

    @classmethod
    async def add_promo(cls, data: SPromoAdd) -> Promo | None:
        async with new_session() as session:
            promo = Promo(code=data.code, sale=data.sale, active=data.active)
            session.add(promo)
            await session.flush()
            await session.commit()
            return promo

    @classmethod
    async def edit_promo(cls, data: SPromoEdit) -> Promo:
        async with new_session() as session:
            query = select(Promo).where(Promo.id == data.id)
            result = await session.execute(query)
            promo = result.scalar_one()
            promo.code = data.code
            promo.sale = data.sale
            promo.active = data.active
            await session.flush()
            await session.commit()
            return promo

    @classmethod
    async def delete_promo(cls, id: int) -> bool:
        async with new_session() as session:
            query = select(Promo).where(Promo.id == id)
            result = await session.execute(query)
            cart = result.scalar_one()
            await session.delete(cart)
            await session.commit()
            return True
