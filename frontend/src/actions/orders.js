// action types
export const LOADED_ORDERS = 'LOADED_ORDERS'
export const FETCH_ORDERS = 'FETCH_ORDERS'
export const ADD_ORDER = 'ADD_ORDER'
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS'
export const ORDERS_FAILURE = 'ORDERS_FAILURE'

// action creators
export function fetchOrders() {
    return { type: FETCH_ORDERS }
}

export function loadedOrders(orders) {
    return { type: LOADED_ORDERS, orders }
}

export function addOrder(products, total) {
    return { type: ADD_ORDER, data: { products, total } }
}

export function addOrderSuccess(order) {
    return { type: ADD_ORDER_SUCCESS, order }
}

export function ordersFailure(error) {
    return { type: ORDERS_FAILURE, error }
}
