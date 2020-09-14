// 暂时无用!!!!!!!!!!!!!
import { GET_OPC, GET_OPC_SUCCESS, GET_OPC_FAILURE } from '../actions/opc';

export const OPC_DEFAULT_STATE = {
    items: [],
    total: 0,
    loading: false,
    error: '',
}

export default function reducerOPC(state = OPC_DEFAULT_STATE, action) {
    switch (action.type) {
    case GET_OPC:
        return { ...state, loading: true }

    case GET_OPC_SUCCESS:
        return {
            ...state,
            items: state.items.concat(action.products),
            total: action.total,
            loading: false,
        }

    case GET_OPC_FAILURE:
        return { ...state, loading: false, error: action.error }

    default:
        return state
    }
}
