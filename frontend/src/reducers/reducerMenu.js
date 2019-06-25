import {
    LOADED_BROWMENU,
    FETCH_BROWMENU
} from "../actions/menus";


export const MENUS_DEFAULT_STATE = {
    loading: false,
    saving: false,
    error: '',
    items: []
}

export default function reducerMenu(state = MENUS_DEFAULT_STATE, action) {
    switch (action.type) {
        case LOADED_BROWMENU:
            console.log("reducerMenu action = ")
            console.log(action)
            console.log(state)
            return {...state, items: action.browMenus, loading: false}

        case FETCH_BROWMENU: {
            return {...state, loading: true}
        }

        default:
            return state
    }
}
