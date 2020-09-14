import {
    SET_LOCALE,
} from '../actions/locale';

export const LOCALE_DEFAULT_STATE = {
    lang: 'en',
}

export default function reducerLocale(state = LOCALE_DEFAULT_STATE, action) {
    switch (action.type) {
    case SET_LOCALE:
        return { ...state, lang: action.lang }
    default:
        return state
    }
}
