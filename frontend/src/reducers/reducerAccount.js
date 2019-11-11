import {
    SIGN_UP,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_INFOS,
    GET_INFOS_SUCCESS,
    GET_INFOS_FAILURE,
    RESET_REDIRECT_STATE
} from "../actions/account";

export const ACCOUNT_DEFAULT_STATE = {
    loading: false,
    redirect: false,
    error: '',
    account: { id: '', email: '' }
}

export default function reducerAccount(state = ACCOUNT_DEFAULT_STATE, action) {
    switch (action.type) {
        case SIGN_UP:
        case LOGIN:
        case GET_INFOS:
            return { ...state, loading: true, redirect: false, error: '' }

        case SIGN_UP_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                account: action.account,
                loading: false,
                redirect: true,
                error: ''
            }

        case SIGN_UP_FAILURE:
        case LOGIN_FAILURE:
        case GET_INFOS_FAILURE:
            return { ...state, loading: false, redirect: false, error: action.error }

        case GET_INFOS_SUCCESS:
            return {
                ...state,
                account: action.account,
                loading: false,
                redirect: true
            }

        case RESET_REDIRECT_STATE:
            return {
                ...state,
                redirect: false
            }
        default:
            return state
    }
}