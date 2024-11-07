from typing import List
from sqlalchemy import select

from src.database import new_session
from src.Roles.models import Roles
from src.Roles.schemas import SRoleEdit


class RoleRepository:
    @classmethod
    async def get_all(cls) -> List[Roles]:
        async with new_session() as session:
            query = select(Roles)
            result = await session.execute(query)
            role_models = result.unique().scalars().all()
            return role_models

    @classmethod
    async def add_role(cls, data: str) -> Roles | None:
        async with new_session() as session:
            new_role = Roles(name=data)
            session.add(new_role)
            await session.flush()
            await session.commit()
            return new_role

    @classmethod
    async def edit_role(cls, data: SRoleEdit) -> Roles:
        async with new_session() as session:
            query = select(Roles).where(Roles.id == data.id)
            result = await session.execute(query)
            role = result.scalar_one()
            role.name = data.name
            await session.flush()
            await session.commit()
            return role

    @classmethod
    async def delete_role(cls, id: int) -> bool:
        async with new_session() as session:
            query = select(Roles).where(Roles.id == id)
            result = await session.execute(query)
            role = result.scalar_one()
            await session.delete(role)
            await session.commit()
            return True
