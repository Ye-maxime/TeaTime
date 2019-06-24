// action types
export const ADD_TO_SHOPPING_CART = 'ADD_TO_SHOPPING_CART'
export const SUBSTRACT_QUANTITY = 'SUBSTRACT_QUANTITY'
export const ADD_QUANTITY = 'ADD_QUANTITY'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

// action creators
export function addToShoppingCart(product) {
    console.log("action creators addToShoppingCart !!!!")
    return { type: ADD_TO_SHOPPING_CART, product }
}

export function substractQuantity(product) {
    return { type: SUBSTRACT_QUANTITY, product }
}

export function addQuantity(product) {
    return { type: ADD_QUANTITY, product }
}

export function removeFromCart(product) {
    return { type: REMOVE_FROM_CART, product }
}