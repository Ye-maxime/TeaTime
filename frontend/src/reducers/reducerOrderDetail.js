import { FETCH_ORDER_DETAIL, LOADED_ORDER_DETAIL } from '../actions/orderDetail';

export const ORDER_DETAIL_DEFAULT_STATE = {
    loading: false,
    error: '',
    items: [],
}

export default function reducerOrderDetail(state = ORDER_DETAIL_DEFAULT_STATE, action) {
    switch (action.type) {
    case FETCH_ORDER_DETAIL:
        return { ...state, loading: true }

    case LOADED_ORDER_DETAIL:
        return { ...state, items: action.products, loading: false }

    default:
        return state
    }
}
