import {all} from 'redux-saga/effects'
import {watchFetchUser} from './usersSaga'
import {watchFetchFiles} from './filesSaga'

function* rootSaga() {
    yield all([
        watchFetchUser(),
        watchFetchFiles(),
    ])
}

export default rootSaga