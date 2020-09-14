// action types
export const ADD_TO_SHOPPING_CART = 'ADD_TO_SHOPPING_CART'
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CLEAN_CART = 'CLEAN_CART'

// action creators
export function addToShoppingCart(product) {
    return { type: ADD_TO_SHOPPING_CART, product }
}

export function removeFromCart(product) {
    return { type: REMOVE_FROM_CART, product }
}

export function changeQuantity(product) {
    return { type: CHANGE_QUANTITY, product }
}

export function cleanCart() {
    return { type: CLEAN_CART }
}
