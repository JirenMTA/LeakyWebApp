from typing import Annotated
from fastapi import APIRouter, Depends, UploadFile

from src.auth.dependencies import verify_cookie, admin_required
from src.auth.schemas import SAccessControl
from src.Images.service import ImagesService

router = APIRouter(prefix="/images", tags=["Изображения"])


@router.post("/upload_avatar/")
async def create_upload_file(
    file: UploadFile, access_schema: Annotated[SAccessControl, Depends(verify_cookie)]
):
    result = await ImagesService.save_avatar(access_schema.id, file)
    return result


@router.post("/upload_product_img/{product_id}")
async def create_upload_file(
    product_id: int, file: UploadFile, _: Annotated[SAccessControl, Depends(admin_required)]
):
    result = await ImagesService.save_product_img(product_id, file)
    return result
