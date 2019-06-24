import {combineReducers} from 'redux'
import reducerDrinks, {DRINKS_DEFAULT_STATE} from "./reducerDrinks";
import reducerShoppingCart, {SHOPPING_CART_DEFAULT_STATE} from "./reducerShoppingCart";

const rootReducer = combineReducers({
    drinks: reducerDrinks,
    shoppingCart: reducerShoppingCart
})

export const DEFAULT_STATE = {
    drinks: DRINKS_DEFAULT_STATE,
    shoppingCart: SHOPPING_CART_DEFAULT_STATE,
}

export default rootReducer
