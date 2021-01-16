import { SHOW_NEWS_DETAIL } from '../constants/ActionTypes';
import { RECEIVE_DATA_MAPS, REQUEST_DATA_MAPS } from "actions/DataMapsAction";

const initalState = {
    data: [],
    isLoading: false
}

export default function DataMapsReducer(state = initalState, action) {
    console.log(action.type)

    switch (action.type) {
        case RECEIVE_DATA_MAPS:
            return {
                ...state,
                data: action.data,
                isLoading: false

            }

        case REQUEST_DATA_MAPS:
            return {...state, isLoading: false}

        default:
            return state;

    }
}