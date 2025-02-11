import {combineReducers} from "redux";
import movieReducer from "./reducer/movieReducer";
import userReducer from "./reducer/userReducer";

const rootReducer = combineReducers({
    movie: movieReducer,
    user: userReducer
})

export default rootReducer;