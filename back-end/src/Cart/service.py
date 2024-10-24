from typing import List
from src.Cart.schemas import (
    SCartGetByUser,
    SCartAdd,
    SCartEdit,
    SCartDelete,
    SResult,
    SCartGet,
)
from src.repository.CartRepository import CartRepository
from src.repository.ProductRepository import ProductRepository


class CartService:
    @classmethod
    async def get_cart_for_user(cls, id: int) -> List[SCartGetByUser]:
        cart_objects = await CartRepository.get_all_for_user(id)
        cart_schemas = [SCartGetByUser.model_validate(cart_obj) for cart_obj in cart_objects]
        return cart_schemas

    @classmethod
    async def add_product(cls, data: SCartAdd) -> SResult:
        product_exists = await ProductRepository.check_exists(data.product_id)
        if not product_exists:
            return SResult(status="Fail", error="No such product!")

        existing_cart = await CartRepository.get_cart_if_exists(data.user_id, data.product_id)
        if existing_cart is not None:
            obj = SCartEdit(
                user_id=existing_cart.user_id,
                product_id=existing_cart.product_id,
                amount=existing_cart.amount + data.amount,
            )
            cart_object = await CartRepository.edit_cart(obj)
            if cart_object is None:
                return SResult(status="Fail", error="Failed to edit cart")

            cart_schema = SCartGet.model_validate(cart_object)
            return SResult(status="Ok", cart=cart_schema)

        cart_obj = await CartRepository.add_cart(data)
        cart_schema = SCartGet.model_validate(cart_obj)
        return SResult(status="Ok", cart=cart_schema)

    @classmethod
    async def edit_cart(cls, data: SCartEdit) -> SResult:
        product_exists = await ProductRepository.check_exists(data.product_id)
        if not product_exists:
            return SResult(status="Fail", error="Not such product")

        cart_object = await CartRepository.edit_cart(data)
        if cart_object is None:
            return SResult(status="Fail", error="Failed to edit cart")

        cart_schema = SCartGet.model_validate(cart_object)
        return SResult(status="Ok", cart=cart_schema)

    @classmethod
    async def delete_cart(cls, data: SCartDelete) -> SResult:
        is_deleted = await CartRepository.delete_cart(data)
        if not is_deleted:
            return SResult(status="Fail", error="Failed to delete cart")
        return SResult(status="Ok")
