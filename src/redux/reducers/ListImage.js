import * as types from '../types'

const initialValue = {
    data: [],
    isLoading: true
}

export default (state = initialValue, action) => {
    if (action.type === types.ADD_IMAGES) {
        state = {...state, isLoading: false, data: [...state.data, action.payload]}
    } else if (action.type === types.DEL_IMAGES) {
        state = {...state , isLoading: false, data: []}
    } else if (action.type === types.EDT_IMAGES) {
        state = {...state, isLoading: false, data: [
            ...state.data.slice(0, action.index), action.payload,
            ...state.data.slice(action.index + 1)
        ]}
    }
    return state
}