import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './src/redux/store'
import {createReduxContainer} from 'react-navigation-redux-helpers'
import AppNavigation from './src/navigation/AppNavigation'
import ReduxNavigation from './src/redux/ReduxNavigation'

export const Nav = createReduxContainer(AppNavigation, 'root')

export default class App extends Component {
  render() {
    return(
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor} >
          <ReduxNavigation/>
        </PersistGate>
      </Provider>
    )
  }
}