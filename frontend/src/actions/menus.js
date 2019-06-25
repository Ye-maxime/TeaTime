// action types
import {DRINKS_FAILURE} from "./drinks";

export const LOADED_BROWMENU = 'LOADED_BROWMENU'
export const LOADED_LULUMENU = 'LOADED_LULUMENU'
export const FETCH_BROWMENU = 'FETCH_BROWMENU'
export const FETCH_LULUMENU = 'FETCH_LULUMENU'
export const  MENU_FAILURE = 'MENU_FAILURE'


// action creators
export function fetchBrowMenu() {
    return {type: FETCH_BROWMENU}
}

export function loadedBrowMenus(menus) {
    return {type: LOADED_BROWMENU, menus}
}

export function menuFailure(error) {
    return { type: MENU_FAILURE, error }
}
