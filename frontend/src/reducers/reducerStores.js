import { LOADED_STORES, FETCH_STORES} from "../actions/stores"

export const STORES_DEFAULT_STATE = {
    loading: false,
    error: '',
    items: []
}

export default function reducerStores(state = STORES_DEFAULT_STATE, action) {
    switch (action.type) {
        case LOADED_STORES:
            return {...state, items: action.stores, loading: false}

        case FETCH_STORES: {
            return {...state, loading: true}
        }

        default:
            return state
    }
}