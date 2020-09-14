import {
    ADD_TO_SHOPPING_CART, REMOVE_FROM_CART, CHANGE_QUANTITY, CLEAN_CART,
} from '../actions/shoppingCart';

export const SHOPPING_CART_DEFAULT_STATE = {
    items: [],
    total: 0,
}

function getExistedItem(state, product) {
    return state.items.find((item) => item.id === product.id)
}

function calculateTotal(products) {
    return products.reduce((sum, product) => sum + product.price * product.quantity, 0)
}

export default function reducerShoppingCart(state = SHOPPING_CART_DEFAULT_STATE, action) {
    switch (action.type) {
    case ADD_TO_SHOPPING_CART: {
        const newProduct = action.product
        const existedItem = getExistedItem(state, newProduct)
        const newTotal = state.total + parseInt(newProduct.price, 0)
        if (existedItem) {
            // 更新产品库存
            existedItem.stock -= 1;
            existedItem.quantity += 1
            return { ...state, total: newTotal }
        }
        // 更新产品库存
        newProduct.stock -= 1;
        newProduct.quantity = 1
        return { ...state, items: state.items.concat(newProduct), total: newTotal }
    }

    case CHANGE_QUANTITY: {
        const { product } = action
        const existedItem = getExistedItem(state, product)
        // 产品总数量
        const totalProductNumber = existedItem.quantity + existedItem.stock;
        existedItem.quantity = product.quantity
        // 更新产品库存
        existedItem.stock = totalProductNumber - existedItem.quantity;
        const newTotal = calculateTotal(state.items)
        return { ...state, total: newTotal }
    }

    case REMOVE_FROM_CART: {
        const { product } = action
        const existedItem = getExistedItem(state, product)
        // eslint-disable-next-line max-len
        const newTotal = state.total - parseInt(existedItem.price, 0) * parseInt(existedItem.quantity, 0)
        const newItems = state.items.filter((item) => item.id !== product.id)
        return { ...state, items: newItems, total: newTotal }
    }

    case CLEAN_CART: {
        return { ...state, items: [], total: 0 }
    }

    default:
        return state
    }
}
