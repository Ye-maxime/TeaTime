// action types
export const SET_LOCALE = 'SET_LOCALE'

// action creators
export function setLocale(lang) {
    localStorage.lang = lang;
    return {type: SET_LOCALE, lang}
}