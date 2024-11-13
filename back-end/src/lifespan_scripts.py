from src.repository.RoleRepository import RoleRepository
from src.repository.AuthRepository import AuthRepository
from src.repository.UserRepository import UserRepository
from src.auth.schemas import SLocalSignUp


async def generate_default_roles():
    await RoleRepository.add_role("customer")
    await RoleRepository.add_role("admin")


async def create_default_admin():
    admin_schema = SLocalSignUp(
        username="admin", email="admin@mail.ru", password="AdminSecretPass"
    )
    admin = await AuthRepository.local_register(admin_schema)
    await UserRepository.update_role(admin.id, 2)
