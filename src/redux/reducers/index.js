import {combineReducers} from 'redux'
import {createNavigationReducer} from 'react-navigation-redux-helpers'
import AppNavigation from '../../navigation/AppNavigation'
import MyLocation from './MyLocation'
import Users from './Users'
import rootSaga from '../sagas/rootSaga'
import ListImage from './ListImage'
import Files from './Files'
import ChatList from './ChatList'
import Rooms from './Rooms'

const router = createNavigationReducer(AppNavigation)

const appReducer = combineReducers({
    router: router,
    rootSaga: rootSaga,
    MyLocation: MyLocation,
    Users: Users,
    ListImage: ListImage,
    Files: Files,
    ChatList: ChatList,
    Rooms: Rooms    
})

export default appReducer