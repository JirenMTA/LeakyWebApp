from sqlalchemy import select
from sqlalchemy.orm import joinedload
from sqlalchemy.sql import func

from src.database import new_session
from src.Comments.models import Comment
from src.Comments.schemas import SCommentAdd
from src.repository import ProductRepository


class CommentRepository:
    @classmethod
    async def get_all_by_user(cls, id: int):
        async with new_session() as session:
            query = (
                select(Comment)
                .where(Comment.author_id == id)
                .options(joinedload(Comment.product))
            )
            result = await session.execute(query)
            comment_models = result.scalars().all()
            return comment_models

    @classmethod
    async def get_all_by_product(cls, id: int):
        async with new_session() as session:
            query = (
                select(Comment)
                .where(Comment.product_id == id)
                .options(joinedload(Comment.author))
            )
            result = await session.execute(query)
            comment_models = result.scalars().all()
            return comment_models

    @classmethod
    async def post_comment(cls, data: SCommentAdd) -> Comment | None:
        async with new_session() as session:
            # product_exists = ProductRepository.check_exists(data.product_id)
            # if not product_exists:
            #    return None

            comment = Comment(
                author_id=data.author_id,
                product_id=data.product_id,
                mark=data.mark,
                comment=data.comment,
            )

            session.add(comment)
            await session.flush()
            await session.commit()

            # query = select(func.avg(Comment.mark).label("average")).filter(
            #    Comment.product_id == data.product_id
            # )

            # avg_rating = await session.execute(query)
            # print(avg_rating)

            return comment
