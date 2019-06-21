import {ADD_TO_SHOPPING_CART} from "../actions/shoppingCart";

export const SHOPPING_CART_DEFAULT_STATE = {
    items: [],
    total: 0
}

export default function reducerShoppingCart(state = SHOPPING_CART_DEFAULT_STATE, action) {
    switch (action.type) {
        case ADD_TO_SHOPPING_CART: {
            console.log("reducers addToShoppingCart !!!!")
            let newProduct = action.product
            const existedItem = state.items.find(item => item.id === newProduct.id)
            const newTotal = state.total + parseInt(newProduct.price)
            if (existedItem) {
                existedItem.quantity += 1
                return {...state, total: newTotal}
            } else {
                newProduct.quantity = 1
                return {...state, items: state.items.concat(newProduct), total: newTotal}
            }
        }

        default:
            console.log("reducerShoppingCart default !!!!")
            return state
    }
}