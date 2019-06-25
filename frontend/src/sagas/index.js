import {call, put, takeLatest, takeEvery} from 'redux-saga/effects'
import {FETCH_DRINKS, ADD_DRINK, loadedDrinks, drinksFailure, addDrinkSuccess} from "../actions/drinks";
import {FETCH_BROWMENU,menuFailure,loadedBrowMenus} from "../actions/menus";

function* getAllDrinks() {
    try {
        const res = yield call(fetch, 'v1/drinks')
        const drinks = yield res.json()
        yield put(loadedDrinks(drinks))
    } catch (e) {
        yield put(drinksFailure(e.message))
    }
}

function* getBrowMenus() {
    console.log("browMenus")
    try {
        const res = yield call(fetch, 'v1/browMenus')
        const browMenus = yield res.json()
        console.log("browMenus")
        console.log(browMenus)
        yield put(loadedBrowMenus(browMenus))
    } catch (e) {
        yield put(menuFailure(e.message))
    }
}

function* saveDrink(action) {
    try {
        console.log("generator saveDrink !!!!")
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




//就在这个rootSaga里面利用takeLatest去监听action的type
// rootSaga可以理解为是一个监听函数，在创建store中间件的时候就已经执行了
function* rootSaga() {
    console.log("rootSaga !!!!")
    yield takeLatest(FETCH_DRINKS, getAllDrinks);
    yield takeLatest(ADD_DRINK, saveDrink);
    yield takeLatest(FETCH_BROWMENU,getBrowMenus);
    // yield takeLatest(DELETE_DRINK, deleteDrink);
    // yield takeEvery(TOGGLE_DRINK, updateDrink);
}

export default rootSaga;
