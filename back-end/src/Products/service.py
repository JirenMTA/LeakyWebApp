from typing import List
from src.repository.ProductRepository import ProductRepository
from src.Products.schemas import SProductGetShort, SProductGetFull, SProductAdd, SResult


class ProductService:
    @classmethod
    async def get_all_products(cls) -> List[SProductGetShort]:
        products = await ProductRepository.get_all()
        product_schemas = [SProductGetShort.model_validate(product) for product in products]
        return product_schemas

    @classmethod
    async def find_products(cls, param: str) -> List[SProductGetShort]:
        products = await ProductRepository.find_products(param)
        product_schemas = [SProductGetShort.model_validate(product) for product in products]
        return product_schemas

    @classmethod
    async def get_one_by_id(cls, id: int) -> SProductGetFull | None:
        product = await ProductRepository.get_one(id)
        if not product:
            return None

        product_schema = SProductGetFull.model_validate(product)
        return product_schema

    @classmethod
    async def add_product(cls, data: SProductAdd) -> SResult:
        product = await ProductRepository.add_product(data)
        if product is None:
            return SResult(status="Fail", error="Failed to add user")

        return SResult(status="Ok", product=SProductGetShort.validate(product))
