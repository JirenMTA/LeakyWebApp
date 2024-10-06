from fastapi import APIRouter

from src.Comments.schemas import (
    SCommentAdd,
    SCommentGetByUser,
    SCommentGetByProduct,
    SResult,
)
from src.repository.CommentRepository import CommentRepository

router = APIRouter(prefix="/comments", tags=["Отзывы"])


@router.get("/product/{id}")
async def get_comments_by_product(id: int) -> list[SCommentGetByProduct]:
    comments = await CommentRepository.get_all_by_product(id)
    comment_schemas = [
        SCommentGetByProduct.model_validate(comment) for comment in comments
    ]
    return comment_schemas


@router.get("/user/{id}")
async def get_comments_by_user(id: int) -> list[SCommentGetByUser]:
    comments = await CommentRepository.get_all_by_user(id)
    comment_schemas = [
        SCommentGetByUser.model_validate(comment) for comment in comments
    ]
    return comment_schemas


@router.post("")
async def post_comment(data: SCommentAdd) -> SResult:
    comment = await CommentRepository.post_comment(data)
    if comment is None:
        return SResult(status="Fail", error="Failed to add user")

    return SResult(status="Ok")
