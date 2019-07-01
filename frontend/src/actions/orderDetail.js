// action types
export const LOADED_ORDER_DETAIL = 'LOADED_ORDER_DETAIL'
export const FETCH_ORDER_DETAIL = 'FETCH_ORDER_DETAIL'
export const ORDER_DETAIL_FAILURE = 'ORDER_DETAIL_FAILURE'

// action creators
export function fetchOrderDetail(orderId) {
    return {type: FETCH_ORDER_DETAIL, orderId}
}

export function loadedOrderDetail(products) {
    return {type: LOADED_ORDER_DETAIL, products}
}

export function orderDetailFailure(error) {
    return { type: ORDER_DETAIL_FAILURE, error }
}

