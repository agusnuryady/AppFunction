import * as types from '../types'

const initialValue = {
    data: [],
    longitude:"",
    latitude:"",
    isLoading: true
}

export default (state = initialValue, action) => {
    if (action.type === types.ADD_MYLOCATION) {
        state = {...state, isLoading: false, longitude: action.payload.longitude, latitude: action.payload.latitude, data: [...state.data, action.payload]}
    } else if (action.type === types.DEL_MYLOCATION) {
        state = {...state , isLoading: false, data: []}
    } else if (action.type === types.EDT_MYLOCATION) {
        state = {...state, isLoading: false, data: [
            ...state.data.slice(0, action.index), action.payload,
            ...state.data.slice(action.index + 1)
        ]}
    }
    return state
}