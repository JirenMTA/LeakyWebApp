import { combineReducers } from "redux";
import userReducer from "./userReducer";
import listCartReducer from "./listCartReducer";
import listOrderReducer from "./listOrderReducer";

const rootReducer = combineReducers({
    listCartState: listCartReducer,
    listOrderState: listOrderReducer,
    userState: userReducer
});

export default rootReducer;