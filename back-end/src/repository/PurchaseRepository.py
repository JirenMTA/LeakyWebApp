from typing import List
from sqlalchemy import select
from sqlalchemy.orm import joinedload

from src.database import new_session
from src.Purchases.models import Purchases
from src.Purchases.schemas import SPurchaseCreate


class PurchaseRepository:
    @classmethod
    async def get_for_order(cls, id: int) -> List[Purchases] | None:
        async with new_session() as session:
            query = (
                select(Purchases)
                .where(Purchases.order_id == id)
                .options(joinedload(Purchases.product))
            )
            result = await session.execute(query)
            purchases_models = result.unique().scalars().all()
            return purchases_models

    @classmethod
    async def add_purchase(cls, data: SPurchaseCreate) -> bool:
        async with new_session() as session:
            new_purchase = Purchases(
                product_id=data.product_id,
                order_id=data.order_id,
                amount=data.amount,
                price=data.price,
            )
            session.add(new_purchase)
            await session.flush()
            await session.commit()
            return True
