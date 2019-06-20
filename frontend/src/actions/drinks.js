// action types
export const LOADED_DRINKS = 'LOADED_DRINKS'
export const FETCH_DRINKS = 'FETCH_DRINKS'
export const DRINKS_FAILURE = 'DRINKS_FAILURE'

// action creators
export function fetchDrinks() {
    return {type: FETCH_DRINKS}
}

export function loadedDrinks(drinks) {
    return {type: LOADED_DRINKS, drinks}
}

export function drinksFailure(error) {
    return { type: DRINKS_FAILURE, error }
}