import { combineReducers } from 'redux'
import reducerDrinks, { DRINKS_DEFAULT_STATE } from "./reducerDrinks";
import reducerShoppingCart, { SHOPPING_CART_DEFAULT_STATE } from "./reducerShoppingCart";
import reducerStores, { STORES_DEFAULT_STATE } from "./reducerStores";
import reducerOrders, { ORDERS_DEFAULT_STATE } from "./reducerOrders";
import reducerOrderDetail, { ORDER_DETAIL_DEFAULT_STATE } from "./reducerOrderDetail";
import reducerLocale, { LOCALE_DEFAULT_STATE } from "./reducerLocale";
import reducerAccount, { ACCOUNT_DEFAULT_STATE } from "./reducerAccount";

const rootReducer = combineReducers({
    drinks: reducerDrinks,
    shoppingCart: reducerShoppingCart,
    stores: reducerStores,
    orders: reducerOrders,
    orderDetail: reducerOrderDetail,
    locale: reducerLocale,
    account: reducerAccount
})

export const DEFAULT_STATE = {
    drinks: DRINKS_DEFAULT_STATE,
    shoppingCart: SHOPPING_CART_DEFAULT_STATE,
    stores: STORES_DEFAULT_STATE,
    orders: ORDERS_DEFAULT_STATE,
    orderDetail: ORDER_DETAIL_DEFAULT_STATE,
    locale: LOCALE_DEFAULT_STATE,
    account: ACCOUNT_DEFAULT_STATE
}

export default rootReducer
