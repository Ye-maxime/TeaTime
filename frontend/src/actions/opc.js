// action types  暂时无用!!!!!!!!!!!!!
export const GET_OPC = 'GET_OPC'
export const GET_OPC_SUCCESS = 'GET_OPC_SUCCESS'
export const GET_OPC_FAILURE = 'GET_OPC_FAILURE'

// action creators
// 发送到后台通过cache验证每个产品的库存是否有货
export function getOPC(products) {
    return { type: GET_OPC, products }
}

// 获取经过cache认证库存后的可买产品
export function getOPCSuccess(products, total) {
    return { type: GET_OPC_SUCCESS, products, total }
}

export function getOPCFailure(error) {
    return { type: GET_OPC_FAILURE, error }
}