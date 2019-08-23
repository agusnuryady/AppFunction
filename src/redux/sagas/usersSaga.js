import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import {receiveUserData} from '../actions/Users'
import {fetchUserData} from '../api'
import * as types from '../types'

function* getUserData() {
    try {
        const data = yield call (fetchUserData)
        yield put(receiveUserData(data))
    } catch (e) {
        console.log(e);
    }
}

export function* watchFetchUser() {
    yield takeLatest(types.GET_USER, getUserData)
}