import {
    LOADED_BROWMENU,
    FETCH_BROWMENU,
    LOADED_LULUMENU,
    FETCH_LULUMENU
} from "../actions/menus";


export const MENUS_DEFAULT_STATE = {
    loading: false,
    saving: false,
    error: '',
    browItems: [],
    luluItems: []
}

export default function reducerMenu(state = MENUS_DEFAULT_STATE, action) {
    switch (action.type) {
        case LOADED_BROWMENU:
            return {...state, browItems: action.browMenus, loading: false}
        case FETCH_BROWMENU:
            return {...state, loading: true}
        case LOADED_LULUMENU:
            return {...state, luluItems: action.luluMenus, loading: false}
        case FETCH_LULUMENU:
            return {...state, loading: true}
        default:
            return state
    }
}
