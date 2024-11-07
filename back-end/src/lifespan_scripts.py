from src.repository.RoleRepository import RoleRepository


async def generate_default_roles():
    await RoleRepository.add_role("customer")
    await RoleRepository.add_role("admin")
