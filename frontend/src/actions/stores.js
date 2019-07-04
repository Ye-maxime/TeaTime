// action types
export const LOADED_STORES = 'LOADED_STORES'
export const FETCH_STORES = 'FETCH_STORES'
export const STORES_FAILURE = 'STORES_FAILURE'
export const SHOW_STORE = 'SHOW_STORE'
export const CLICK_STORE = 'CLICK_STORE'

// action creators
export function fetchStores() {
    return {type: FETCH_STORES}
}

export function loadedStores(stores) {
    return {type: LOADED_STORES, stores}
}

export function storesFailure(error) {
    return {type: STORES_FAILURE, error}
}

export function showStore(store) {
    return {type: SHOW_STORE, store}
}

export function clickStore(store) {
    return {type: CLICK_STORE, store}
}