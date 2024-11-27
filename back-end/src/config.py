import os


def get_auth_data():
    secret = os.getenv("JWT_SECRET")
    if secret is None:
        return {
            "secret_key": "vH-oaA-hTGYGwSeUpzTD0pv0I4KTVqVGtCxU__dCpfdAmStSwHmBDIUa1I9CntRP",
            "algorithm": "HS256",
        }
    else:
        return {"secret_key": secret, "algorithm": "HS256"}
