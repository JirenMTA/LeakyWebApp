import { FETCH_USER_LOGIN, FETCH_USER_LOGOUT } from "../action/userActions";

const INITIAL_STATE = {
    account: {
        email: '',
        role: '',
        username: '',
        id: '',
        avatar: null
    },
    isAuthenticated: false
}


const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN:
            return {
                account: {
                    ...state.account,
                    ...action.payload?.account
                },
                isAuthenticated: action?.payload?.isAuthenticated || state?.isAuthenticated
            };
        case FETCH_USER_LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
}

export default userReducer;