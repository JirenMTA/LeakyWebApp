import { FETCH_LIST_CART } from '../action/listCartAction'

const INITIAL_STATE = {
    orderList: []
}


const listCartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_LIST_CART:
            return {
                ...state,
                orderList: action.payload.orderList
            };
        default:
            return state;

    }
}

export default listCartReducer;