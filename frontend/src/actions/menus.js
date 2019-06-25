// action types
import {DRINKS_FAILURE} from "./drinks";

export const LOADED_BROWMENU = 'LOADED_BROWMENU'
export const LOADED_LULUMENU = 'LOADED_LULUMENU'
export const FETCH_BROWMENU = 'FETCH_BROWMENU'
export const FETCH_LULUMENU = 'FETCH_LULUMENU'
export const  MENU_FAILURE = 'MENU_FAILURE'


// action creators
export function fetchBrowMenu() {
    console.log("menu actions fetch menu")
    return {type: FETCH_BROWMENU}
}

export function fetchLuluMenu() {
    console.log("menu actions fetch menu")
    return {type: FETCH_LULUMENU}
}

export function loadedBrowMenus(browMenus) {
    console.log("menu actions loaded menu")
    return {type: LOADED_BROWMENU, browMenus}
}

export function loadedLuluMenus(luluMenus) {
    console.log("menu actions loaded menu")
    return {type: LOADED_LULUMENU, luluMenus}
}

export function menuFailure(error) {
    return { type: MENU_FAILURE, error }
}
