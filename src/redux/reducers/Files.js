import * as types from '../types'

const initialValue = {
    data: [],
    page:"",
    isLoading: true,
    isError: false,
    isFinish: false,
}

export default (state = initialValue, action) => {
    switch (action.type) {
        case types.GET_FILES:
            return {...state, isLoading: true}
        case types.GET_FILES_FULFILLED:
            return {...state, isLoading: false, isFinish: true, page: action.payload.data.page, data: state.data.concat(action.payload.data.data)}
        case types.GET_FILES_REJECTED:
            return {...state, isLoading: false, isError: true, data: action.data}
        case types.CLR_FILES:
            return {...state, data: []}
        default:
            return state
    }
}