import * as types from '../types'
import axios from 'axios'

export const requestFilesData = () => ({type: types.GET_FILES})
export const receiveFilesData = data => ({type: types.GET_FILES_FULFILLED, data})

export const delFile = data => {
    return {
        type: types.DEL_FILES,
        payload: axios.delete(`http://appexperiment.herokuapp.com/api/v1/file/delete/${data.id}`, )
    }
}