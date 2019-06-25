// action types
export const LOADED_STORES = 'LOADED_STORES'
export const FETCH_STORES = 'FETCH_STORES'
export const STORES_FAILURE = 'STORES_FAILURE'

// action creators
export function fetchStores() {
    return {type: FETCH_STORES}
}

export function loadedStores(stores) {
    return {type: LOADED_STORES, stores}
}

export function storesFailure(error) {
    return { type: STORES_FAILURE, error }
}