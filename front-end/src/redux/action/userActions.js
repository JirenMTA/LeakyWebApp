export const FETCH_USER_LOGIN = "FETCH_USER_LOGIN"
export const FETCH_USER_LOGOUT = "FETCH_USER_LOGOUT"

export const doLogin = (data) => {
    return {
        type: FETCH_USER_LOGIN,
        payload: data
    }
}

export const doLogout = () => {
    return {
        type: FETCH_USER_LOGOUT,
    }
}

