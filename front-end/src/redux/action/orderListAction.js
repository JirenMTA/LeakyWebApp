export const FETCH_LIST_ORDER = "FETCH_LIST_ORDER"

export const doFetchListOrder = (data) => {
    return {
        type: FETCH_LIST_ORDER,
        payload: data
    }
}

