import * as types from '../types'

export const addData = data => {
    return {
        type: types.ADD_MYLOCATION,
        payload: {longitude:data.longitude, latitude:data.latitude}
    }
}

export const delData = index => {
    return {
        type: types.DEL_MYLOCATION,
        index: index
    }
}

export const edtData = data => {
    return {
        type: types.EDT_MYLOCATION,
        payload: {longitude:data.longitude, latitude:data.latitude},
        index: data.index
    }
}