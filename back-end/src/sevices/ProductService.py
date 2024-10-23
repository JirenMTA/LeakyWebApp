from typing import List
from src.repository.ProductRepository import ProductRepository
from src.Products.schemas import SProductGetShort


class ProductService:
    @classmethod
    async def get_all_products(cls) -> List[SProductGetShort]:
        products = await ProductRepository.get_all()
        product_schemas = [SProductGetShort.model_validate(product) for product in products]
        return product_schemas
