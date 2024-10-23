from typing import List
from src.repository.CommentRepository import CommentRepository
from src.Comments.schemas import SCommentGetByProduct, SCommentGetByUser, SCommentAdd, SResult
from src.repository.ProductRepository import ProductRepository


class CommentService:
    @classmethod
    async def get_comments_by_product(cls, id: int) -> List[SCommentGetByProduct]:
        comments = await CommentRepository.get_all_by_product(id)
        comment_schemas = [
            SCommentGetByProduct.model_validate(comment) for comment in comments
        ]
        return comment_schemas

    @classmethod
    async def get_comments_by_user(cls, id: int) -> List[SCommentGetByUser]:
        comments = await CommentRepository.get_all_by_user(id)
        comment_schemas = [SCommentGetByUser.model_validate(comment) for comment in comments]
        return comment_schemas

    @classmethod
    async def add_comment(cls, data: SCommentAdd) -> SResult:
        product_exists = await ProductRepository.check_exists(data.product_id)
        if not product_exists:
            return SResult(status="Fail", error="Not such product")

        comment = await CommentRepository.post_comment(data)
        if comment is None:
            return SResult(status="Fail", error="Failed to post comment")

        await ProductRepository.update_average_mark(data.product_id)
        return SResult(status="Ok")
