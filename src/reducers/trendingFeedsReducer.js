import { SHOW_NEWS_DETAIL } from '../constants/ActionTypes';
import { RECEIVE_NEWS_LOAD_MORE, RECEIVE_NEWS_RELOAD, REQUEST_NEWS_LOAD_MORE, REQUEST_NEWS_RELOAD } from "../actions/TrendingFeedsAction";

const initalState = {
    list: [],
    page: 1,
    isFetching: false,
    hasMore: true,
    statusCode: 0,
    message: ""
}

export default function trendingFeedsReducer(state = initalState, action) {
    console.log(action.type)

    switch (action.type) {
        case RECEIVE_NEWS_RELOAD:
            return {
                ...state,
                isFetching: false,
                page: 1,
                hasMore: action.list && action.list.length > 0,
                list: [...action.list],
                statusCode: action.statusCode,
                message: action.message
            }

        case RECEIVE_NEWS_LOAD_MORE:
            console.log("state: ");
            console.log(state);
            console.log("list: ");
            console.log(action.list);
            return {
                ...state,
                isFetching: false,
                page: state.page + 1,
                hasMore: action.list && action.list.length > 0,
                list: [...state.list, ...action.list],
                statusCode: action.statusCode,
                message: action.message
            }

        case REQUEST_NEWS_LOAD_MORE:
        case REQUEST_NEWS_RELOAD:
            return Object.assign({}, state, {
                isFetching: true
            })

        case SHOW_NEWS_DETAIL:
        default:
            return state;

    }
}