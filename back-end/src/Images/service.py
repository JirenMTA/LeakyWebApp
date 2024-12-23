from typing import Tuple
from fastapi import UploadFile
from uuid import uuid4
import os

from src.Images.schemas import SResult
from src.repository.ProductRepository import ProductRepository
from src.repository.UserRepository import UserRepository

allowed_content_types = ["image/png", "image/jpg", "image/jpeg", "image/svg", "image/svg+xml"]


class ImagesService:

    @classmethod
    async def save_avatar(cls, user_id: int, img: UploadFile) -> SResult:
        if img.size > 5242880:
            return SResult(status="Fail", error="File is too big. Should be less then 5 Mb")
        if img.content_type not in allowed_content_types:
            return SResult(
                status="Fail", error=f"Invalid content-type. Allowed {allowed_content_types}"
            )
        contents = await img.read()
        filetype = img.filename.split(".")[-1]
        new_name = str(uuid4()) + "." + filetype
        with open(
            os.path.join("static", "avatar", new_name), "wb+"
        ) as binary_file:
            binary_file.write(contents)

        filename = await UserRepository.set_avatar(user_id, new_name)
        return SResult(status="Ok", filename=filename)

    @classmethod
    async def save_product_img(cls, product_id: int, img: UploadFile) -> SResult:
        if img.size > 5242880:
            return SResult(status="Fail", error="File is too big. Should be less then 5 Mb")
        if img.content_type not in allowed_content_types:
            return SResult(
                status="Fail", error=f"Invalid content-type. Allowed {allowed_content_types}"
            )
        contents = await img.read()
        filetype = img.filename.split(".")[-1]
        new_name = str(uuid4()) + "." + filetype
        with open(
            os.path.join("static", "product", new_name), "wb+"
        ) as binary_file:
            binary_file.write(contents)
        filename = await ProductRepository.set_image(product_id, new_name)

        return SResult(status="Ok", filename=filename)
