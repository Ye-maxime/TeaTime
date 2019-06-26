import {ADD_TO_SHOPPING_CART, REMOVE_FROM_CART, CHANGE_QUANTITY} from "../actions/shoppingCart";

export const SHOPPING_CART_DEFAULT_STATE = {
    items: [],
    total: 0
}

export default function reducerShoppingCart(state = SHOPPING_CART_DEFAULT_STATE, action) {
    switch (action.type) {
        case ADD_TO_SHOPPING_CART: {
            console.log("reducers addToShoppingCart !!!!")
            let newProduct = action.product
            const existedItem = getExistedItem(state, newProduct)
            const newTotal = state.total + parseInt(newProduct.price, 0)
            if (existedItem) {
                existedItem.quantity += 1
                return {...state, total: newTotal}
            } else {
                newProduct.quantity = 1
                return {...state, items: state.items.concat(newProduct), total: newTotal}
            }
        }

        case CHANGE_QUANTITY: {
            const product = action.product
            const existedItem = getExistedItem(state, product)
            existedItem.quantity = product.quantity
            const newTotal = calculateTotal(state.items)
            return {...state, total: newTotal}
        }

        case REMOVE_FROM_CART: {
            const product = action.product
            const existedItem = getExistedItem(state, product)
            const newTotal = state.total - parseInt(existedItem.price, 0)*parseInt(existedItem.quantity, 0)
            const newItems = state.items.filter(item => item.id !== product.id)
            return {...state, items: newItems, total: newTotal}
        }

        default:
            console.log("reducerShoppingCart default !!!!")
            return state
    }
}

function getExistedItem(state, product) {
    return state.items.find(item => item.id === product.id)
}

function calculateTotal(products) {
    return products.reduce((sum, product) =>  sum + product.price * product.quantity, 0)
}