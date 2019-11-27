import * as types from '../types'
import axios from 'axios'

export const showRooms = () => { 
    return {
        type: types.GET_ROOMS,
        payload: axios.get(`https://appexperiment.herokuapp.com/api/v1/rooms`)
    }
}

export const createRoom = () => { 
    return {
        type: types.ADD_ROOM,
        payload: axios.post(`https://appexperiment.herokuapp.com/api/v1/room/create`)
    }
}

export const requestChatList = id => { 
    return {
        type: types.GET_CHATLIST,
        payload: axios.get(`https://appexperiment.herokuapp.com/api/v1/room/${id}`)
    }
}

export const addChatList = data => {
    return {
        type: types.GET_CHATLIST,
        payload: data
    }
}


export const createChats = data => { 
    return {
        type: types.ADD_CHATS,
        payload: axios.get(`https://appexperiment.herokuapp.com/api/v1/message/${data.id}`, {name: data.name, message: data.message})
    }
}