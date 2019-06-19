import {combineReducers} from 'redux'
import todos, {TODOS_DEFAULT_STATE} from './todos'
import reducerDrinks, {DRINKS_DEFAULT_STATE} from "./drinks";

const todoApp = combineReducers({
    todos,
    reducerDrinks
})

export const DEFAULT_STATE = {
    todos: TODOS_DEFAULT_STATE,
    drinks: DRINKS_DEFAULT_STATE
}

export default todoApp
