import {createAppContainer, createStackNavigator} from 'react-navigation'
import Home from '../screens/home/Home'
import Maps from '../screens/features/Map'
import Upload from '../screens/features/Upload'
import Notification from '../screens/features/Notification'

const AppNavigation = createStackNavigator({
    Home:Home,
    Map:Maps,
    Upload:Upload,
    Notification:Notification,
},{
    initialRouteName:'Home',
    headerMode:'none'
})

export default createAppContainer(AppNavigation)