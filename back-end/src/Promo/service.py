from typing import List
from src.repository.PromoRepository import PromoRepository
from src.Promo.schemas import SPromoGet, SPromoAdd, SPromoEdit, SPromoDelete, SResult
from src.Bot.notifications import notif_create_promo


class PromoService:
    @classmethod
    async def get_all(cls) -> List[SPromoGet]:
        promos = await PromoRepository.get_all()
        promo_schemas = [SPromoGet.model_validate(promo) for promo in promos]
        return promo_schemas

    @classmethod
    async def add_promo(cls, data: SPromoAdd) -> SResult:
        promo = await PromoRepository.add_promo(data)
        promo_schema = SPromoGet.model_validate(promo)
        await notif_create_promo(promo)
        return SResult(status="Ok", promo=promo_schema)

    @classmethod
    async def edit_promo(cls, data: SPromoEdit) -> SResult:
        is_exists = await PromoRepository.check_promo_exists(data.id)
        if not is_exists:
            return SResult(status="Fail", error="No such promo")
        promo = await PromoRepository.edit_promo(data)
        promo_schema = SPromoGet.model_validate(promo)
        return SResult(status="Ok", promo=promo_schema)

    @classmethod
    async def delete_promo(cls, data: SPromoDelete) -> SResult:
        result = await PromoRepository.delete_promo(data.id)
        if result:
            return SResult(status="Ok")
        return SResult(status="Fail")
