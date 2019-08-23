import {call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import {receiveFilesData} from '../actions/Files'
import {fetchFilesData} from '../api'
import * as types from '../types'

function* getFilesData() {
    try {
        const data = yield call (fetchFilesData)
        yield put(receiveFilesData(data))
    } catch (e) {
        console.log(e);
    }
}

export function* watchFetchFiles() {
    yield takeLatest(types.GET_FILES, getFilesData)
}