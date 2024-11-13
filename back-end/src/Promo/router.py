from typing import Annotated, List
from fastapi import APIRouter, Depends

from src.Promo.schemas import (
    SPromoGet,
    SPromoAdd,
    SPromoEdit,
    SPromoDelete,
    SResult,
)
from src.Promo.service import PromoService
from src.auth.dependencies import admin_required
from src.auth.schemas import SAccessControl

router = APIRouter(prefix="/promo", tags=["Промокоды"])


@router.get("")
async def get_all_promo(
    _: Annotated[SAccessControl, Depends(admin_required)]
) -> List[SPromoGet]:
    promo_schemas = await PromoService.get_all()
    return promo_schemas


@router.post("")
async def add_promo(
    data: SPromoAdd, _: Annotated[SAccessControl, Depends(admin_required)]
) -> SResult:
    result = await PromoService.add_promo(data)
    return result


@router.put("")
async def edit_promo(
    data: SPromoEdit, _: Annotated[SAccessControl, Depends(admin_required)]
) -> SResult:
    result = await PromoService.edit_promo(data)
    return result


@router.delete("")
async def delete_promo(
    data: SPromoDelete, _: Annotated[SAccessControl, Depends(admin_required)]
) -> SResult:
    result = await PromoService.delete_promo(data)
    return result
