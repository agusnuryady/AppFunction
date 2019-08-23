import * as types from '../types'

export const addImage = data => {
    return {
        type: types.ADD_IMAGES,
        payload: {id:data.id, uri:data.uri, name:data.name, description:data.description}
    }
}

export const delImage = index => {
    return {
        type: types.DEL_IMAGES,
        index: index
    }
}

export const edtImage = data => {
    return {
        type: types.EDT_IMAGES,
        payload: {id:data.id, uri:data.uri, name:data.name, description:data.description},
        index: data.index
    }
}