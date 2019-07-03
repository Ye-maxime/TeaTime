import {LOADED_STORES, FETCH_STORES, SHOW_STORE, CLICK_STORE} from "../actions/stores";

export const STORES_DEFAULT_STATE = {
    loading: false,
    error: '',
    storeSelected:0,
    storeClicked:0,
    items: []
}

export default function reducerStores(state = STORES_DEFAULT_STATE, action) {
    switch (action.type) {
        case LOADED_STORES:
            return {...state, items: action.stores, loading: false}

        case FETCH_STORES: {
            return {...state, loading: true}
        }
        case SHOW_STORE : {
            const storeFind = state.items.find((store) => {
                return store.latitude === action.store.lat && store.longitude === action.store.lng
            })
            return {...state, storeSelected: storeFind.id, loading:true}
        }
        case CLICK_STORE : {
            return {...state, storeSelected: action.store.id, loading:false}
        }

        default:
            return state
    }
}