from typing import List
from fastapi import APIRouter

from src.Promo.schemas import (
    SPromoGet,
    SPromoAdd,
    SPromoEdit,
    SPromoDelete,
    SResult,
)
from src.Promo.service import PromoService

router = APIRouter(prefix="/promo", tags=["Промокоды"])


@router.get("")
async def get_all_promo() -> List[SPromoGet]:
    promo_schemas = await PromoService.get_all()
    return promo_schemas


@router.post("")
async def add_promo(data: SPromoAdd) -> SResult:
    result = await PromoService.add_promo(data)
    return result


@router.put("")
async def edit_promo(data: SPromoEdit) -> SResult:
    result = await PromoService.edit_promo(data)
    return result


@router.delete("")
async def delete_promo(data: SPromoDelete) -> SResult:
    result = await PromoService.delete_promo(data)
    return result
