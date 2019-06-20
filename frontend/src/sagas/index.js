import {call, put, takeLatest, takeEvery} from 'redux-saga/effects'
import {
    ADD_TODO,
    DELETE_TODO,
    TOGGLE_TODO,
    FETCH_TODOS,
    loadedTodos,
    addTodoSuccess,
    todosFailure
} from '../actions/todos'

import {FETCH_DRINKS, loadedDrinks, drinksFailure} from "../actions/drinks";

function* getAllTodos() {
    try {
        const res = yield call(fetch, 'v1/todos')
        const todos = yield res.json()
        yield put(loadedTodos(todos))
    } catch (e) {
        yield put(todosFailure(e.message))
    }
}

function* saveTodo(action) {
    try {
        console.log("generator saveTodo !!!!")
        const options = {
            method: 'POST',
            body: JSON.stringify(action.todo),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        const res = yield call(fetch, 'v1/todos', options)
        const todo = yield res.json()
        yield put(addTodoSuccess(todo))
    } catch (e) {
        yield put(todosFailure(e.message))
    }
}

function* deleteTodo(action) {
    try {
        yield call(fetch, `v1/todos/${action.id}`, {method: 'DELETE'})
    } catch (e) {
        yield put(todosFailure(e.message))
    }
}

function* updateTodo(action) {
    try {
        yield call(fetch, `v1/todos/${action.id}`, {method: 'POST'})
    } catch (e) {
        yield put(todosFailure(e.message))
    }
}


function* getAllDrinks() {
    try {
        const res = yield call(fetch, 'v1/drinks')
        const drinks = yield res.json()
        yield put(loadedDrinks(drinks))
    } catch (e) {
        yield put(drinksFailure(e.message))
    }
}


function* rootSaga() {
    console.log("rootSaga !!!!")
    yield takeLatest(FETCH_TODOS, getAllTodos);
    yield takeLatest(ADD_TODO, saveTodo);
    yield takeLatest(DELETE_TODO, deleteTodo);
    yield takeEvery(TOGGLE_TODO, updateTodo);
    yield takeLatest(FETCH_DRINKS, getAllDrinks);
}

export default rootSaga;
