import * as types from '../types'

const initialValue = {
    data: [],
    isLoading: true,
    isError: false,
    isFinish: false,
}

export default (state = initialValue, action) => {
    switch (action.type) {
        case types.GET_CHATLIST:
            return {...state, isLoading: true}
        case types.GET_CHATLIST_FULFILLED:
            return {...state, isLoading: false, isFinish: true, data: [...state.data, action.payload.data]}
        case types.GET_CHATLIST_REJECTED:
            return {...state, isLoading: false, isError: true, data: action.data}
        case types.ADD_CHATLIST:
            return {...state, isLoading: false, isFinish: true }
        // case types.DEL_CHATLIST:
        //     return {...state, isLoading: false, isFinish: true, data: action.payload.data}
        default:
            return state
    }
}