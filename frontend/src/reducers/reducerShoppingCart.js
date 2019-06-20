import {ADD_TO_SHOPPING_CART} from "../actions/shoppingCart";

export const SHOPPING_CART_DEFAULT_STATE = {
    items: []
}

export default function reducerShoppingCart(state = SHOPPING_CART_DEFAULT_STATE, action) {
    switch (action.type) {
        case ADD_TO_SHOPPING_CART:
            console.log("reducers addToShoppingCart !!!!")
            return {items: state.items.concat(action.product)}
    }
}