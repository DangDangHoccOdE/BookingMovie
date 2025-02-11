import {ADD_MOVIE_TO_STATE, CLEAN_STATE} from "../actions/movieActions";

const initialState = {}

export default function movieReducer(state=initialState, {type, payload}){
    switch (type){
        case ADD_MOVIE_TO_STATE:
            return {
                ...state, payload
            }
        case CLEAN_STATE:
            return {

            }
        default:
            return state;
    }
}