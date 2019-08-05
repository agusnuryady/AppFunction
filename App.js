import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation'
import AppNavigation from './src/navigation/AppNavigation'

const AppContainer = createAppContainer(AppNavigation)

export default class App extends Component{
  render() {
    return <AppContainer/>
  }
}