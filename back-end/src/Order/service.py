from typing import List
from time import sleep

from src.repository.OrderRepository import OrderRepository
from src.Order.schemas import (
    SOrderGet,
    SOrderGetShort,
    SOrderCreate,
    SUsePromo,
    SPayForOrder,
    SResult,
    SOrderCreateFromFont,
)
from src.repository.CartRepository import CartRepository
from src.Purchases.schemas import SPurchaseCreate
from src.repository.PromoRepository import PromoRepository


class OrderService:
    @classmethod
    async def get_orders_for_user(cls, user_id: int) -> List[SOrderGet]:
        orders = await OrderRepository.get_orders_for_user(user_id)
        order_schemas = [SOrderGet.model_validate(order) for order in orders]
        return order_schemas

    @classmethod
    async def create_order(cls, user_id: int, data: SOrderCreateFromFont) -> SResult:
        purchases_arr = []
        for elem in data.products:
            cart = await CartRepository.upd_cart_if_exists(user_id, elem.cart_id, elem.amount)
            if cart is None:
                return SResult(status="Fail", error=f"Not such cart id: {elem.cart_id}")
            purchases_arr.append(
                SPurchaseCreate(
                    product_id=cart.product.id,
                    amount=elem.amount,
                    price=cart.product.full_price,
                )
            )
        order_create = SOrderCreate.model_validate({"products": purchases_arr})
        new_order = await OrderRepository.create_order(user_id, order_create)
        return SResult(status="Ok", order=new_order)

    @classmethod
    async def use_promo_for_order(cls, user_id: int, data: SUsePromo) -> SOrderGetShort:
        promo_id = await PromoRepository.check_promo_active(data.promo)
        # TODO Тут замедлить для race condition
        sleep(0.2)
        order = await OrderRepository.use_promo_for_order(user_id, data.order_id, promo_id)
        order_schema = SOrderGetShort.model_validate(order)
        return order_schema

    @classmethod
    async def pay_for_order(cls, user_id: int, data: SPayForOrder) -> SResult:
        exist = await OrderRepository.check_order_exist_for_user(user_id, data.order_id)
        if not exist:
            return SResult(status="Fail", error=f"Not such order!")
        order = await OrderRepository.pay_for_order(user_id, data)
        if not order:
            return SResult(status="Fail", error="Not enough money!")
        order_schema = SOrderGetShort.model_validate(order)
        return SResult(status="Ok", order=order_schema)
