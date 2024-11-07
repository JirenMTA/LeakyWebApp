from fastapi import APIRouter, status, HTTPException
from src.Roles.schemas import (
    SRoleAdd,
    SRoleGet,
    SRoleEdit,
    SRoleDelete,
    SResult,
)

from src.Roles.service import RolesService

router = APIRouter(prefix="/roles", tags=["Роли пользователей"])


@router.get("")
async def get_roles() -> list[SRoleGet]:
    role_schemas = await RolesService.get_all_roles()
    return role_schemas


@router.post("")
async def add_role(data: SRoleAdd) -> SResult:
    result = await RolesService.add_role(data)
    return result


@router.put("")
async def edit_role(data: SRoleEdit) -> SResult:
    result = await RolesService.edit_role(data)
    return result


@router.delete("")
async def delete_role(data: SRoleDelete) -> SResult:
    result = await RolesService.delete_role(data)
    return result
