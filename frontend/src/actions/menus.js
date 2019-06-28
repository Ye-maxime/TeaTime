// action types
export const LOADED_BROWMENU = 'LOADED_BROWMENU'
export const LOADED_LULUMENU = 'LOADED_LULUMENU'
export const FETCH_BROWMENU = 'FETCH_BROWMENU'
export const FETCH_LULUMENU = 'FETCH_LULUMENU'
export const MENU_FAILURE = 'MENU_FAILURE'


// action creators
export function fetchBrowMenu() {
    return {type: FETCH_BROWMENU}
}

export function fetchLuluMenu() {
    return {type: FETCH_LULUMENU}
}

export function loadedBrowMenus(browMenus) {
    return {type: LOADED_BROWMENU, browMenus}
}

export function loadedLuluMenus(luluMenus) {
    return {type: LOADED_LULUMENU, luluMenus}
}

export function menuFailure(error) {
    return {type: MENU_FAILURE, error}
}
