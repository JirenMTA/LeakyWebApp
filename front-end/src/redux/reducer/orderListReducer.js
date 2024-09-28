import { FETCH_LIST_ORDER } from '../action/orderListAction'

const INITIAL_STATE = {
    orderList: []
}


const orderListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_LIST_ORDER:
            return {
                ...state,
                orderList: action.payload.orderList
            };
        default:
            return state;

    }
}

export default orderListReducer;