async def cart_paginator(skip: int = 0, limit: int = 20) -> dict:
    if limit > 50:
        limit = 50  # to avoid DOS
    return {"skip": skip, "limit": limit}
