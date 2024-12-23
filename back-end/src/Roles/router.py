from typing import Annotated
from fastapi import APIRouter, Depends
from src.Roles.schemas import (
    SRoleAdd,
    SRoleGet,
    SRoleEdit,
    SRoleDelete,
    SResult,
)

from src.Roles.service import RolesService
from src.Users.service import UserService
from src.auth.dependencies import admin_required
from src.auth.schemas import SAccessControl

router = APIRouter(prefix="/roles", tags=["Роли пользователей"])


@router.get("")
async def get_roles() -> list[SRoleGet]:
    role_schemas = await RolesService.get_all_roles()
    return role_schemas


@router.post("")
async def add_role(
    data: SRoleAdd, _: Annotated[SAccessControl, Depends(admin_required)]
) -> SResult:
    result = await RolesService.add_role(data)
    return result


@router.put("")
async def edit_role(
    data: SRoleEdit, _: Annotated[SAccessControl, Depends(admin_required)]
) -> SResult:
    result = await RolesService.edit_role(data)
    return result


@router.delete("")
async def delete_role(
    data: SRoleDelete, _: Annotated[SAccessControl, Depends(admin_required)]
) -> SResult:
    result = await RolesService.delete_role(data)
    return result


@router.post("/user")
async def change_role_for_user(
    user_id: int, role_id: int, _: Annotated[SAccessControl, Depends(admin_required)]
) -> SResult:
    result = await UserService.update_role(user_id, role_id)
    return result
