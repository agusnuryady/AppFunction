import * as types from '../types'

const initialValue = {
    data: [],
    isLoading: true,
    isError: false,
    isFinish: false,
}

export default (state = initialValue, action) => {
    switch (action.type) {
        case types.GET_FILES:
            return {...state, isLoading: true}
        case types.GET_FILES_FULFILLED:
            return {...state, isLoading: false, isFinish: true, data: action.data}
        case types.GET_FILES_REJECTED:
            return {...state, isLoading: false, isError: true, data: action.data}
        default:
            return state
    }
}