import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers'
import {createLogger} from 'redux-logger'
import promise from 'redux-promise-middleware'
// import createSagaMiddleware from 'redux-saga'
// import rootSaga from './sagas/rootSaga'

const middlewares = []

const reactNavigation = createReactNavigationReduxMiddleware(
    state => state.router
)

// const sagaMiddleware = createSagaMiddleware()
// sagaMiddleware.run(rootSaga)

//middlewares.push(sagaMiddleware)
middlewares.push(createLogger())
middlewares.push(reactNavigation)
middlewares.push(promise)

export default middlewares