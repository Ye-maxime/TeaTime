import {LOADED_DRINKS, FETCH_DRINKS} from "../actions/drinks";

export const DRINKS_DEFAULT_STATE = {
    loading: false,
    error: '',
    items: []
}

export default function reducerDrinks(state = DRINKS_DEFAULT_STATE, action) {
    switch (action.type) {
        case LOADED_DRINKS:
            console.log("reducerDrinks action = ")
            console.log(action)
            return {...state, items: action.drinks, loading: false}

        case FETCH_DRINKS: {
            return {...state, loading: true}
        }

        default:
            return state
    }
}