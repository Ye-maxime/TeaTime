// action types
export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'

export const LOGIN = 'LOGIN'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const GET_INFOS = 'GET_INFOS'
export const GET_INFOS_FAILURE = 'GET_INFOS_FAILURE'
export const GET_INFOS_SUCCESS = 'GET_INFOS_SUCCESS'

export const RESET_REDIRECT_STATE = 'RESET_REDIRECT_STATE'

export const LOG_OUT = 'LOG_OUT'

// action creators
export function signup(firstname, lastname, email, password) {
    return { type: SIGN_UP, data: { firstname: firstname, lastname: lastname, email: email, password: password } }
}

export function signupSuccess(account, token) {
    // localStorage can't set type object
    // TODO set in cookie?
    localStorage.account = JSON.stringify(account);
    localStorage.token = token;
    return { type: SIGN_UP_SUCCESS, account }
}

export function signupFailure(error) {
    return { type: SIGN_UP_FAILURE, error }
}

export function login(email, password) {
    return { type: LOGIN, data: { email: email, password: password } }
}

export function loginSuccess(account, token) {
    localStorage.account = JSON.stringify(account);
    localStorage.token = token;
    return { type: LOGIN_SUCCESS, account }
}

export function loginFailure(error) {
    return { type: LOGIN_FAILURE, error }
}

export function getAccountInfos() {
    return { type: GET_INFOS }
}

export function getAccountInfosSuccess(account) {
    return { type: GET_INFOS_SUCCESS, account }
}

export function getAccountInfosFailure(error) {
    return { type: GET_INFOS_FAILURE, error }
}

export function resetRedirectState() {
    return { type: RESET_REDIRECT_STATE }
}

export function logout() {
    return { type: LOG_OUT }
}
