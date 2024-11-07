from typing import List

from src.repository.RoleRepository import RoleRepository
from src.Roles.schemas import SRoleAdd, SRoleGet, SRoleEdit, SRoleDelete, SResult


class RolesService:
    @classmethod
    async def get_all_roles(cls) -> List[SRoleGet]:
        roles = await RoleRepository.get_all()
        role_schemas = [SRoleGet.model_validate(role) for role in roles]
        return role_schemas

    @classmethod
    async def add_role(cls, data: SRoleAdd) -> SResult:
        new_role = await RoleRepository.add_role(data.name)
        if new_role is None:
            return SResult(status="Fail", error="Failed to add new role")

        return SResult(status="Ok", role=SRoleGet.validate(new_role))

    @classmethod
    async def edit_role(cls, data: SRoleEdit) -> SResult:
        edited_role = await RoleRepository.edit_role(data)
        if edited_role is None:
            return SResult(status="Fail", error="Failed to add edit role")

        return SResult(status="Ok", role=SRoleGet.validate(edited_role))

    @classmethod
    async def delete_role(cls, data: SRoleDelete) -> SResult:
        success = await RoleRepository.delete_role(data.id)
        if not success:
            return SResult(status="Fail", error="Failed to add delete role")

        return SResult(status="Ok")
