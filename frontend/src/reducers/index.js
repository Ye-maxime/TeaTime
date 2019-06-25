import {combineReducers} from 'redux'
import reducerDrinks, {DRINKS_DEFAULT_STATE} from "./reducerDrinks";
import reducerShoppingCart, {SHOPPING_CART_DEFAULT_STATE} from "./reducerShoppingCart";
import reducerStores, {STORES_DEFAULT_STATE} from "./reducerStores";

const rootReducer = combineReducers({
    drinks: reducerDrinks,
    shoppingCart: reducerShoppingCart,
    stores: reducerStores,
})

export const DEFAULT_STATE = {
    drinks: DRINKS_DEFAULT_STATE,
    shoppingCart: SHOPPING_CART_DEFAULT_STATE,
    stores: STORES_DEFAULT_STATE,
}

export default rootReducer
