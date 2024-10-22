from fastapi import APIRouter
from src.Products.schemas import (
    SProductAdd,
    SProductGetShort,
    SProductGetFull,
    SResult,
)
from src.repository.ProductRepository import ProductRepository
from src.sevices.ProductService import ProductService

router = APIRouter(prefix="/products", tags=["Товары"])


@router.get("")
async def get_products() -> list[SProductGetShort]:
    product_schemas = await ProductService.get_all_products()
    return product_schemas


@router.get("/{id}")
async def get_product(id: int) -> SProductGetFull:
    product = await ProductRepository.get_one(id)
    product_schema = SProductGetFull.model_validate(product)
    return product_schema


@router.post("")
async def add_product(data: SProductAdd) -> SResult:
    product = await ProductRepository.add_product(data)
    if product is None:
        return SResult(status="Fail", error="Failed to add user")

    return SResult(status="Ok", product=SProductGetShort.validate(product))
