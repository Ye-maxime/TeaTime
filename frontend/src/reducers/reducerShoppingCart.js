import {ADD_TO_SHOPPING_CART, SUBSTRACT_QUANTITY, ADD_QUANTITY, REMOVE_FROM_CART} from "../actions/shoppingCart";

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
            const newTotal = calculateTotal(state, newProduct)
            if (existedItem) {
                existedItem.quantity += 1
                return {...state, total: newTotal}
            } else {
                newProduct.quantity = 1
                return {...state, items: state.items.concat(newProduct), total: newTotal}
            }
        }

        case SUBSTRACT_QUANTITY: {
            const product = action.product
            const existedItem = getExistedItem(state, product)
            const newTotal = calculateTotal(state, parseInt(product.price), false)
            if (existedItem.quantity > 1) {
                existedItem.quantity -= 1
                return {...state, total: newTotal}
            } else {
                //quantity 0, should be removed from cart
                const newItems = state.items.filter(item => item.id !== product.id)
                return {...state, items: newItems, total: newTotal}
            }
        }

        case ADD_QUANTITY: {
            const product = action.product
            const existedItem = getExistedItem(state, product)
            const newTotal = calculateTotal(state, parseInt(product.price))
            existedItem.quantity += 1
            return {...state, total: newTotal}
        }

        case REMOVE_FROM_CART: {
            const product = action.product
            const existedItem = getExistedItem(state, product)
            const newTotal = calculateTotal(state, parseInt(existedItem.price)*parseInt(existedItem.quantity), false)
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

function calculateTotal(state, amount, isAdded = true) {
    return state.total + (isAdded ? amount : -amount)
}