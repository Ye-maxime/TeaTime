import {call, put, takeLatest, /*takeEvery*/} from 'redux-saga/effects'
import {FETCH_DRINKS, ADD_DRINK, loadedDrinks, drinksFailure, addDrinkSuccess} from "../actions/drinks";
import {FETCH_STORES, loadedStores, storesFailure} from "../actions/stores";
import {FETCH_ORDERS, ADD_ORDER, loadedOrders, addOrderSuccess, ordersFailure} from "../actions/orders";
import {FETCH_ORDER_DETAIL, loadedOrderDetail, orderDetailFailure} from "../actions/orderDetail";

//**********************Drinks*************************
function* getAllDrinks() {
    try {
        const res = yield call(fetch, 'v1/drinks')
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
        const res = yield call(fetch, 'v1/drinks', options)
        const drink = yield res.json()
        // 就相当dispatch(action)出去，reducer边接收到相应的action.type就会对数据进行相应的操作,最后通过react-redux的connect回到视图中，完成了一次数据驱动视图,
        yield put(addDrinkSuccess(drink))
    } catch (e) {
        yield put(drinksFailure(e.message))
    }
}

// function* deleteDrink(action) {
//     try {
//         yield call(fetch, `v1/todos/${action.id}`, {method: 'DELETE'})
//     } catch (e) {
//         yield put(todosFailure(e.message))
//     }
// }
//
// function* updateDrink(action) {
//     try {
//         yield call(fetch, `v1/todos/${action.id}`, {method: 'POST'})
//     } catch (e) {
//         yield put(todosFailure(e.message))
//     }
// }


//**********************Stores*************************
function* getAllStores() {
    try {
        const res = yield call(fetch, 'v1/stores')
        const stores = yield res.json()
        yield put(loadedStores(stores))
    } catch (e) {
        yield put(storesFailure(e.message))
    }
}


//**********************Orders*************************
function* getAllOrders() {
    try {
        const res = yield call(fetch, 'v1/orders')
        const orders = yield res.json()
        yield put(loadedOrders(orders))
    } catch (e) {
        yield put(ordersFailure(e.message))
    }
}

function* saveOrder(action) {
    try {
        const options = {
            method: 'POST',
            body: JSON.stringify(action.data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }
        const res = yield call(fetch, 'v1/orders', options)
        const order = yield res.json()
        yield put(addOrderSuccess(order))
    } catch (e) {
        yield put(ordersFailure(e.message))
    }
}

//**********************OrderDetail*************************
function* getOrderDetail(action) {
    try {
        const res =  yield call(fetch, `v1/order_detail/${action.orderId}`, {method: 'POST'})
        const products = yield res.json()
        yield put(loadedOrderDetail(products))
    } catch (e) {
        yield put(orderDetailFailure(e.message))
    }
}



//就在这个rootSaga里面利用takeLatest去监听action的type
// rootSaga可以理解为是一个监听函数，在创建store中间件的时候就已经执行了
function* rootSaga() {
    console.log("rootSaga !!!!")
    //********************drinks*****************
    yield takeLatest(FETCH_DRINKS, getAllDrinks);
    yield takeLatest(ADD_DRINK, saveDrink);
    // yield takeLatest(DELETE_DRINK, deleteDrink);
    // yield takeEvery(TOGGLE_DRINK, updateDrink);

    //********************stores*****************
    yield takeLatest(FETCH_STORES, getAllStores);

    //********************orders*****************
    yield takeLatest(FETCH_ORDERS, getAllOrders);
    yield takeLatest(ADD_ORDER, saveOrder);

    //********************order_detail*****************
    yield takeLatest(FETCH_ORDER_DETAIL, getOrderDetail);

}

export default rootSaga;
