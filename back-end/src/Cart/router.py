from typing import Annotated
from fastapi import APIRouter, Depends

from src.auth.dependencies import verify_cookie
from src.auth.schemas import SAccessControl
from src.Cart.schemas import (
    SCartGetByUserFull,
    SCartAdd,
    SCartEdit,
    SCartDelete,
    SResult,
)
from src.Cart.service import CartService
from src.Cart.dependencies import cart_paginator

router = APIRouter(prefix="/cart", tags=["Корзина"])


@router.get("")
async def get_cart(
    access_schema: Annotated[SAccessControl, Depends(verify_cookie)],
    paginator: Annotated[dict, Depends(cart_paginator)],
) -> SCartGetByUserFull:
    cart_schemas = await CartService.get_cart_for_user(access_schema.id, paginator)
    return cart_schemas


@router.post("")
async def add_to_cart(
    data: SCartAdd, access_schema: Annotated[SAccessControl, Depends(verify_cookie)]
) -> SResult:
    result = await CartService.add_product(access_schema.id, data)
    return result


@router.put("")
async def edit_cart(
    data: SCartEdit, access_schema: Annotated[SAccessControl, Depends(verify_cookie)]
) -> SResult:
    result = await CartService.edit_cart(access_schema.id, data)
    return result


@router.delete("")
async def delete_cart(
    data: SCartDelete, access_schema: Annotated[SAccessControl, Depends(verify_cookie)]
) -> SResult:
    result = await CartService.delete_cart(access_schema.id, data)
    return result
