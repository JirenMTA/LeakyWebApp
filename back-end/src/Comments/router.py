from typing import List
from fastapi import APIRouter

from src.Comments.schemas import (
    SCommentAdd,
    SCommentGetByUser,
    SCommentGetByProduct,
    SResult,
)
from src.Comments.service import CommentService

router = APIRouter(prefix="/comments", tags=["Отзывы"])


@router.get("/product/{id}")
async def get_comments_by_product(id: int) -> List[SCommentGetByProduct]:
    comment_schemas = await CommentService.get_comments_by_product(id)
    return comment_schemas


@router.get("/user/{id}")
async def get_comments_by_user(id: int) -> List[SCommentGetByUser]:
    comment_schemas = await CommentService.get_comments_by_user(id)
    return comment_schemas


@router.post("")
async def post_comment(data: SCommentAdd) -> SResult:
    result = await CommentService.add_comment(data)
    return result
