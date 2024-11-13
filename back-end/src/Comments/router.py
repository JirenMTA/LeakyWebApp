from typing import List, Annotated
from fastapi import APIRouter, Depends

from src.Comments.schemas import (
    SCommentAdd,
    SCommentGetByUser,
    SCommentGetByProduct,
    SResult,
)
from src.auth.schemas import SAccessControl
from src.auth.dependencies import verify_cookie
from src.Comments.service import CommentService
from src.Comments.dependencies import comments_paginator

router = APIRouter(prefix="/comments", tags=["Отзывы"])


@router.get("/product/{id}")
async def get_comments_by_product(
    id: int, paginator: Annotated[dict, Depends(comments_paginator)]
) -> List[SCommentGetByProduct]:
    comment_schemas = await CommentService.get_comments_by_product(id, paginator)
    return comment_schemas


@router.get("/user/{id}")
async def get_comments_by_user(
    id: int, paginator: Annotated[dict, Depends(comments_paginator)]
) -> List[SCommentGetByUser]:
    comment_schemas = await CommentService.get_comments_by_user(id, paginator)
    return comment_schemas


@router.post("")
async def post_comment(
    data: SCommentAdd, access_schema: Annotated[SAccessControl, Depends(verify_cookie)]
) -> SResult:
    result = await CommentService.add_comment(access_schema.id, data)
    return result
