import * as types from '../types'
import axios from 'axios'

export const requestFilesData = page => { 
    return {
        type: types.GET_FILES,
        payload: axios.get(`http://appexperiment.herokuapp.com/api/v1/files/${page}`)
    }
}

export const receiveFilesData = data => ({type: types.GET_FILES_FULFILLED, data})

export const clearFilesData = () => {
    return {
        type: types.CLR_FILES
    }
}

export const delFile = data => {
    return {
        type: types.DEL_FILES,
        payload: axios.delete(`http://appexperiment.herokuapp.com/api/v1/file/delete/${data.id}`, )
    }
}