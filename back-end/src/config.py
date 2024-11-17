import os


def get_auth_data():
    secret = os.getenv("JWT_SECRET")
    if secret is None:
        return {"secret_key": "DEFAULT_SECRET", "algorithm": "HS256"}
    else:
        return {"secret_key": secret, "algorithm": "HS256"}
