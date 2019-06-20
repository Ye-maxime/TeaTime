// action types
export const ADD_TO_SHOPPING_CART = 'ADD_TO_SHOPPING_CART'

// action creators
export function addToShoppingCart(product) {
    console.log("action creators addToShoppingCart !!!!")
    return { type: ADD_TO_SHOPPING_CART, product }
}
