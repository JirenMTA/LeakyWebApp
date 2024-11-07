async def comments_paginator(skip: int = 0, limit: int = 20) -> dict:
    if limit > 100:
        limit = 100  # to avoid DOS
    return {"skip": skip, "limit": limit}
