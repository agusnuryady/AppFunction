import {createAppContainer, createStackNavigator} from 'react-navigation'
import Home from '../screens/home/Home'
import Maps from '../screens/features/Map'
import Storage from '../screens/features/Storage'
import Upload from '../screens/features/Upload'
import Notification from '../screens/features/Notification'
import ListPicture from '../screens/features/Camera/ListPicture'
import Camera from '../screens/features/Camera/Camera'
import SaveImage from '../screens/features/Camera/SaveImage'
import QRScan from '../screens/features/QRScan'
import Barcode from '../screens/features/Barcode'
import GoogleLogin from '../screens/features/GoogleLogin'
import Chart from '../screens/features/Chart'
import Tables from '../screens/features/Tables'

const AppNavigation = createStackNavigator({
    Home:Home,
    Maps:Maps,
    Storage:Storage,
    Upload:Upload,
    Notification:Notification,
    ListPicture:ListPicture,
    Camera:Camera,
    SaveImage:SaveImage,
    QRScan:QRScan,
    Barcode:Barcode,
    GoogleLogin:GoogleLogin,
    Chart:Chart,
    Tables:Tables,
},{
    initialRouteName:'Home',
    headerMode:'none'
})

export default createAppContainer(AppNavigation)