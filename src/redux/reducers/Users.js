import * as types from '../types'

const initialValue = {
    data: [],
    isLoading: true,
    isError: false,
    isFinish: false,
}

export default (state = initialValue, action) => {
    switch (action.type) {
        case types.GET_USER_FULFILLED:
            return {...state, isLoading: false, isFinish: true, data: action.data}
        default:
            return state
    }
}