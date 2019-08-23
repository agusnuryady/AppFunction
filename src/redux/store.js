import {createStore, applyMiddleware} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import appReducer from './reducers/index'
import middlewares from './middleware';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootSaga'

const config = {
    key: "secret",
    storage: AsyncStorage,
    whitelist: ['MyLocation'],
    blacklist: ['router','Users',"ListImage"],
}

//penempatan urutan fungsi sangat penting agar tidak error :

const sagaMiddleware = createSagaMiddleware()

let persistedReducer = persistReducer(config, appReducer)

let store = createStore(persistedReducer, applyMiddleware(...middlewares,sagaMiddleware))

sagaMiddleware.run(rootSaga)

let persistor = persistStore(store)


export {
    store,
    persistor,
}
