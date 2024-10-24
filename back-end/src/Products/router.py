from fastapi import APIRouter, status, HTTPException
from src.Products.schemas import (
    SProductAdd,
    SProductGetShort,
    SProductGetFull,
    SResult,
)

from src.Products.service import ProductService

router = APIRouter(prefix="/products", tags=["Товары"])


@router.get("")
async def get_products() -> list[SProductGetShort]:
    product_schemas = await ProductService.get_all_products()
    return product_schemas


@router.get("/{id}")
async def get_product(id: int) -> SProductGetFull:
    product_schema = await ProductService.get_one_by_id(id)
    if not product_schema:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No such product")
    return product_schema


@router.post("")
async def add_product(data: SProductAdd) -> SResult:
    result = await ProductService.add_product(data)
    return result
