import { combineReducers } from "redux";
import orderListReducer from "./orderListReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    orderListState: orderListReducer,
    userState: userReducer
});

export default rootReducer;