from typing import List, Annotated
from fastapi import APIRouter, Depends

from src.Order.schemas import (
    SOrderGet,
    SPayForOrder,
    SOrderCreateFromFont,
    SUsePromo,
    SOrderGetShort,
    SResult,
)
from src.auth.schemas import SAccessControl
from src.auth.dependencies import verify_cookie
from src.Order.service import OrderService

router = APIRouter(prefix="/orders", tags=["Заказы"])


@router.get("")
async def get_orders_for_user(
    access_schema: Annotated[SAccessControl, Depends(verify_cookie)]
) -> List[SOrderGet]:
    orders_schemas = await OrderService.get_orders_for_user(access_schema.id)
    return orders_schemas


@router.post("")
async def create_order(
    data: SOrderCreateFromFont,
    access_schema: Annotated[SAccessControl, Depends(verify_cookie)],
) -> SResult:
    result = await OrderService.create_order(access_schema.id, data)
    return result


@router.post("/promo")
async def use_promo_for_order(
    data: SUsePromo, access_schema: Annotated[SAccessControl, Depends(verify_cookie)]
) -> SOrderGetShort:
    result = await OrderService.use_promo_for_order(access_schema.id, data)
    return result


@router.post("/pay")
async def pay_for_order(
    data: SPayForOrder, access_schema: Annotated[SAccessControl, Depends(verify_cookie)]
) -> SResult:
    result = await OrderService.pay_for_order(access_schema.id, data)
    return result
