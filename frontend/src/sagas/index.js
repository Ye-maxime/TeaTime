import { call, put, takeLatest, /*takeEvery*/ } from 'redux-saga/effects'
import { FETCH_DRINKS, ADD_DRINK, loadedDrinks, drinksFailure, addDrinkSuccess } from "../actions/drinks";
import { FETCH_STORES, loadedStores, storesFailure } from "../actions/stores";
import { FETCH_ORDERS, ADD_ORDER, loadedOrders, addOrderSuccess, ordersFailure } from "../actions/orders";
import { FETCH_ORDER_DETAIL, loadedOrderDetail, orderDetailFailure } from "../actions/orderDetail";
import { SIGN_UP, signupSuccess, signupFailure, GET_INFOS, getAccountInfosSuccess, getAccountInfosFailure, LOGIN, loginSuccess, loginFailure } from "../actions/account";
// import { GET_OPC, getOPCSuccess, getOPCFailure } from "../actions/opc";
import Utils from '../util/Utils';
// import Cookies from 'js-cookie';

//**********************Drinks*************************
function* getAllDrinks() {
    try {
        const res = yield call(fetch, process.env.API_BASE_URL + 'drinks')
        const drinks = yield res.json()
        yield put(loadedDrinks(drinks))
    } catch (e) {
        yield put(drinksFailure(e.message))
    }
}

function* saveDrink(action) {
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(action.drink),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        const res = yield call(fetch, process.env.API_BASE_URL + 'drinks', options)
        const drink = yield res.json()
        // 就相当dispatch(action)出去，reducer边接收到相应的action.type就会对数据进行相应的操作,最后通过react-redux的connect回到视图中，完成了一次数据驱动视图,
        yield put(addDrinkSuccess(drink))
    } catch (e) {
        yield put(drinksFailure(e.message))
    }
}

// function* deleteDrink(action) {
//     try {
//         yield call(fetch, `${process.env.API_BASE_URL}todos/${action.id}`, {method: 'DELETE'})
//     } catch (e) {
//         yield put(todosFailure(e.message))
//     }
// }
//
// function* updateDrink(action) {
//     try {
//         yield call(fetch, `${process.env.API_BASE_URL}todos/${action.id}`, {method: 'POST'})
//     } catch (e) {
//         yield put(todosFailure(e.message))
//     }
// }


//**********************Stores*************************
function* getAllStores() {
    try {
        const res = yield call(fetch, process.env.API_BASE_URL + 'stores')
        const stores = yield res.json()
        yield put(loadedStores(stores))
    } catch (e) {
        yield put(storesFailure(e.message))
    }
}

//**********************OPC*************************
// function* getOPC(action) {
//     try {
//         const id = Utils.getAccountIdFromLocalStorage();
//         if (id) {
//             const options = {
//                 method: 'POST',
//                 body: JSON.stringify(action.products),
//                 headers: new Headers({
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.token}`
//                 })
//             }
//             const res = yield call(fetch, process.env.API_BASE_URL + 'opc', options)
//             const result = yield res.json()
//             yield put(getOPCSuccess(result.availableProducts, result.total));
//         } else {
//             throw Error("getOPC : No user logged in!!")
//         }
//     } catch (e) {
//         yield put(getOPCFailure(e.message))
//     }
// }

//**********************Orders*************************
function* getAllOrders(action) {
    try {
        // const token = Cookies.get('jwt');
        const id = Utils.getAccountIdFromLocalStorage();
        if (id) {
            const options = {
                method: 'POST',
                body: JSON.stringify({ accountId: id }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                })
            }
            const res = yield call(fetch, process.env.API_BASE_URL + 'orders/getOrders', options)
            if (res.ok === false) {
                // error comes from the jwt part in backend/server.js
                throw Error("getAllOrders : No user logged in!!")
            }
            const orders = yield res.json()
            yield put(loadedOrders(orders))
        } else {
            throw Error("getAllOrders : No user logged in!!")
        }
    } catch (e) {
        console.log('[sagas/index.js#getAllOrders] : catch ' + e);
        yield put(ordersFailure(e.message))
    }
}

// function* saveOrder(action) {
//     try {
//         const id = Utils.getAccountIdFromLocalStorage();
//         if (id) {
//             action.data.accountId = id;
//             const options = {
//                 method: 'POST',
//                 body: JSON.stringify(action.data),
//                 headers: new Headers({
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.token}`
//                 })
//             }
//             const res = yield call(fetch, process.env.API_BASE_URL + 'orders/saveOrder', options)
//             const order = yield res.json()
//             yield put(addOrderSuccess(order))
//         } else {
//             throw Error("saveOrder : No user logged in!!")
//         }
//     } catch (e) {
//         yield put(ordersFailure(e.message))
//     }
// }

//**********************OrderDetail*************************
function* getOrderDetail(action) {
    try {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            })
        }
        const res = yield call(fetch, `${process.env.API_BASE_URL}order_detail/${action.orderId}`, options)
        const products = yield res.json()
        yield put(loadedOrderDetail(products))
    } catch (e) {
        yield put(orderDetailFailure(e.message))
    }
}

//**********************Account*************************
function* signup(action) {
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(action.data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        const res = yield call(fetch, process.env.API_BASE_URL + 'account/signup', options)
        const result = yield res.json()
        if (result.success) {
            const { success, token, ...account } = result;
            console.log(`[sagas/index.js#signup] : account = ${JSON.stringify(account)}`)
            yield put(signupSuccess(account, token))
        } else {
            yield put(signupFailure(result.error))
        }
    } catch (e) {
        yield put(signupFailure(e.message))
    }
}

function* login(action) {
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(action.data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        const res = yield call(fetch, process.env.API_BASE_URL + 'account/login', options)
        const result = yield res.json()
        if (result.success) {
            const { success, token, ...account } = result;
            console.log(`[sagas/index.js#login] : account = ${JSON.stringify(account)}`)
            yield put(loginSuccess(account, token))
        } else {
            yield put(loginFailure(result.error))
        }
    } catch (e) {
        yield put(loginFailure(e.message))
    }
}

function* getAccountInfomations(action) {
    try {
        const id = Utils.getAccountIdFromLocalStorage();
        if (id) {
            const data = { accountId: id }
            const options = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                })
            }
            const res = yield call(fetch, process.env.API_BASE_URL + 'account/getAccountInfos', options)
            if (res.ok === false) {
                // error comes from the jwt part in backend/server.js
                throw Error("getAccountInfomations : No user logged in!!")
            }
            const result = yield res.json()
            const { ...account } = result;
            console.log(`[sagas/index.js#getAccountInfomations] : account = ${JSON.stringify(account)}`)
            yield put(getAccountInfosSuccess(account))
        } else {
            throw Error("getAccountInfomations : No user logged in!!")
        }
    } catch (e) {
        yield put(getAccountInfosFailure(e.message))
    }
}


//就在这个rootSaga里面利用takeLatest去监听action的type
// rootSaga可以理解为是一个监听函数，在创建store中间件的时候就已经执行了
function* rootSaga() {
    //********************drinks*****************
    yield takeLatest(FETCH_DRINKS, getAllDrinks);
    yield takeLatest(ADD_DRINK, saveDrink);
    // yield takeLatest(DELETE_DRINK, deleteDrink);
    // yield takeEvery(TOGGLE_DRINK, updateDrink);

    //********************stores*****************
    yield takeLatest(FETCH_STORES, getAllStores);

    //********************orders*****************
    yield takeLatest(FETCH_ORDERS, getAllOrders);
    // yield takeLatest(ADD_ORDER, saveOrder);

    //********************order_detail*****************
    yield takeLatest(FETCH_ORDER_DETAIL, getOrderDetail);

    //********************account*****************
    yield takeLatest(SIGN_UP, signup);
    yield takeLatest(LOGIN, login);
    yield takeLatest(GET_INFOS, getAccountInfomations);

    //********************opc*****************
    // yield takeLatest(GET_OPC, getOPC);
}

export default rootSaga;
