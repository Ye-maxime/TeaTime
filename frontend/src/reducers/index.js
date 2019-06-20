import {combineReducers} from 'redux'
import reducerTodos, {TODOS_DEFAULT_STATE} from './reducerTodos'
import reducerDrinks, {DRINKS_DEFAULT_STATE} from "./reducerDrinks";

const rootReducer = combineReducers({
    todos: reducerTodos,
    drinks: reducerDrinks
})

export const DEFAULT_STATE = {
    todos: TODOS_DEFAULT_STATE,
    drinks: DRINKS_DEFAULT_STATE
}

export default rootReducer
