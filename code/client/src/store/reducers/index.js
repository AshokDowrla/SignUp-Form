import { combineReducers } from "redux"

import errorReducer from "./errorReducer"
import authReducer from "./authReducer"
import listReducer from "./listReducer"
import mapReducer from "./mapReducer"

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    list:listReducer,
    map:mapReducer
})