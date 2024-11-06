from src.Cart.schemas import (
    SCartGetByUserObj,
    SCartGetByUserFull,
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
    async def get_cart_for_user(cls, id: int, paginator: dict) -> SCartGetByUserFull:
        cart_objects = await CartRepository.get_all_for_user(id, paginator)
        cart_schemas = [
            SCartGetByUserObj.model_validate(cart_obj) for cart_obj in cart_objects
        ]

        summary = await CartRepository.get_summary(id)
        result = SCartGetByUserFull(user_id=id, products=[], total_products=0, total_price=0.0)
        if summary[0][0]:  # TODO когда-нибудь избавиться от этого!
            summary = summary[0]

            result = SCartGetByUserFull(
                user_id=id,
                products=cart_schemas,
                total_products=summary[0],
                total_price=summary[1],
            )
        return result

    @classmethod
    async def add_product(cls, user_id: int, data: SCartAdd) -> SResult:
        product_exists = await ProductRepository.check_exists(data.product_id)
        if not product_exists:
            return SResult(status="Fail", error="No such product!")

        existing_cart = await CartRepository.get_cart_if_exists_by_product(
            user_id, data.product_id
        )
        if existing_cart is not None:
            obj = SCartEdit(
                user_id=user_id,
                product_id=existing_cart.product_id,
                amount=existing_cart.amount + data.amount,
            )
            cart_object = await CartRepository.edit_cart(user_id, obj)
            if cart_object is None:
                return SResult(status="Fail", error="Failed to edit cart")

            cart_schema = SCartGet.model_validate(cart_object)
            return SResult(status="Ok", cart=cart_schema)

        cart_obj = await CartRepository.add_cart(user_id, data)
        cart_schema = SCartGet.model_validate(cart_obj)
        return SResult(status="Ok", cart=cart_schema)

    @classmethod
    async def edit_cart(cls, user_id: int, data: SCartEdit) -> SResult:
        product_exists = await ProductRepository.check_exists(data.product_id)
        if not product_exists:
            return SResult(status="Fail", error="Not such product")

        cart_object = await CartRepository.edit_cart(user_id, data)
        if cart_object is None:
            return SResult(status="Fail", error="Failed to edit cart")

        cart_schema = SCartGet.model_validate(cart_object)
        return SResult(status="Ok", cart=cart_schema)

    @classmethod
    async def delete_cart(cls, user_id: int, data: SCartDelete) -> SResult:
        is_deleted = await CartRepository.delete_cart(user_id, data)
        if not is_deleted:
            return SResult(status="Fail", error="Failed to delete cart")
        return SResult(status="Ok")
