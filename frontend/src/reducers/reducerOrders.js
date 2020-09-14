import {
    ADD_ORDER, ADD_ORDER_SUCCESS, FETCH_ORDERS, LOADED_ORDERS, ORDERS_FAILURE,
} from '../actions/orders';

export const ORDERS_DEFAULT_STATE = {
    loading: false,
    saving: false,
    error: '',
    items: [],
}

export default function reducerOrders(state = ORDERS_DEFAULT_STATE, action) {
    switch (action.type) {
    case FETCH_ORDERS: {
        return { ...state, loading: true }
    }

    case LOADED_ORDERS:
        return { ...state, items: action.orders, loading: false }

    case ADD_ORDER:
        return { ...state, saving: true }

    case ADD_ORDER_SUCCESS:
        return {
            ...state,
            items: state.items.concat(action.order),
            saving: false,
        }

    case ORDERS_FAILURE:
        return {
            ...state, loading: false, saving: false, error: action.error,
        }

    default:
        return state
    }
}
