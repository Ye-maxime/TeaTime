// action types
export const LOADED_DRINKS = 'LOADED_DRINKS'
export const FETCH_DRINKS = 'FETCH_DRINKS'
export const ADD_DRINK = 'ADD_DRINK'
export const DRINKS_FAILURE = 'DRINKS_FAILURE'
export const ADD_DRINK_SUCCESS = 'ADD_DRINK_SUCCESS'
export const TOGGLE_DRINK = 'TOGGLE_DRINK'
export const DELETE_DRINK = 'DELETE_DRINK'

// action creators
export function fetchDrinks() {
    return {type: FETCH_DRINKS}
}

export function loadedDrinks(drinks) {
    return {type: LOADED_DRINKS, drinks}
}

export function addDrink(drink) {
    console.log("action creators addDrink !!!!")
    return { type: ADD_DRINK, drink }
}

export function addDrinkSuccess(drink) {
    console.log("action creators addDrinkSuccess !!!!")
    return { type: ADD_DRINK_SUCCESS, drink }
}

export function drinksFailure(error) {
    return { type: DRINKS_FAILURE, error }
}

export function toggleDrink(id) {
    return { type: TOGGLE_DRINK, id }
}

export function deleteDrink(id) {
    return { type: DELETE_DRINK, id }
}