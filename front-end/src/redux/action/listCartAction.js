export const FETCH_LIST_CART = "FETCH_LIST_CART"

export const doFetchListCart = (data) => {
    return {
        type: FETCH_LIST_CART,
        payload: data
    }
}

