import * as types from '../types'

export const requestUserData = () => ({type: types.GET_USER})
export const receiveUserData = data => ({type: types.GET_USER_FULFILLED, data})