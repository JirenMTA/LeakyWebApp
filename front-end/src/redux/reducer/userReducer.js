import { FETCH_USER_LOGIN, FETCH_USER_LOGOUT } from "../action/userActions";

const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        id: ''
    },
    isAuthenticated: false
}


const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN:
            return {
                ...state,
                account: {
                    access_token: action?.payload?.account?.access_token,
                    refresh_token: action.payload?.account?.refresh_token,
                    username: action.payload?.account?.username,
                    id: action.payload?.account?.id,
                    role: action.payload?.account?.role,
                },
                isAuthenticated: action?.payload?.isAuthenticated
            };
        case FETCH_USER_LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
}

export default userReducer;