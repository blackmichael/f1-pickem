import {GET_LEAGUES, GET_LEAGUES_ERROR} from '../types';

const initialState = {
    leagues: [],
    loading: true,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_LEAGUES:
            return {
                ...state,
                leagues: action.payload,
                loading: false,
            }
        
        case GET_LEAGUES_ERROR:
            return {
                loading: false,
                error: action.payload,
                leagues: [],
            }

        default:
            return state
    }
}