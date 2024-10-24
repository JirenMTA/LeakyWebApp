from typing import List
from fastapi import APIRouter

from src.Cart.schemas import (
    SCartGetByUserFull,
    SCartAdd,
    SCartEdit,
    SCartDelete,
    SResult,
)
from src.Cart.service import CartService

router = APIRouter(prefix="/cart", tags=["Корзина"])


@router.get("")
async def get_cart() -> SCartGetByUserFull:
    # TODO get user_id from cookie
    user_id = 1
    cart_schemas = await CartService.get_cart_for_user(user_id)
    return cart_schemas


@router.post("")
async def add_to_cart(data: SCartAdd) -> SResult:
    result = await CartService.add_product(data)
    return result


@router.put("/edit")
async def edit_cart(data: SCartEdit) -> SResult:
    result = await CartService.edit_cart(data)
    return result


@router.delete("/delete")
async def delete_cart(data: SCartDelete) -> SResult:
    result = await CartService.delete_cart(data)
    return result
