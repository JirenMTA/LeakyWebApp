import { FETCH_LIST_ORDER } from "../action/listOrderAction"

const INITIAL_STATE = {
    numberOrder: 0
}


const listOrderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_LIST_ORDER:
            return {
                numberOrder: action.payload.numberOrder
            };
        default:
            return state;
    }
}

export default listOrderReducer;