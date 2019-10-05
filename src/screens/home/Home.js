import React, { Component } from 'react'
import {StatusBar, SafeAreaView, PermissionsAndroid,StyleSheet,ActivityIndicator,View,Text,TextInput,Alert,TouchableHighlight,TouchableOpacity,TouchableWithoutFeedback,Dimensions,Image} from 'react-native'
import {Icon,Header,Content,Container,Thumbnail} from 'native-base'
import SkeletonPlasceholder from 'react-native-skeleton-placeholder'
import {Transition, FluidNavigator} from 'react-navigation-fluid-transitions'
import {connect} from 'react-redux'
import styles from './styles'
import * as actionMyLocation from '../../redux/actions/MyLocation'
import * as actionUsers from '../../redux/actions/Users'
import * as actionFiles from '../../redux/actions/Files'

var { width, height } = Dimensions.get('window')

class Home extends Component {
    
    constructor(props){
        super(props)
        this.state={
            searchVisible: false,
            page: 1,
            loading:true,
        }
            
    }

    async componentDidMount() {
        await this.findCurrentLocation()
        await this.props.fetchUsers()
        await this.props.fetchFiles(this.state.page)
    }

    async findCurrentLocation() {
        try {
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Example App',
                'message': 'Example App access to your location '
            }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.props.delData()
                    this.props.addData({longitude:position.coords.longitude, latitude:position.coords.latitude})
                },
                error => Alert.alert(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                )
            } else {
            console.log("location permission denied")
            alert("Location permission denied");
            }
        } catch (err) {
            console.warn(err)
        }
    }

    render() {
        if (this.props.Files.isLoading) {
            return (
                <SafeAreaView>
                    <SkeletonPlasceholder>
                        <View style={[styles.container, {alignItems:'center', flexDirection:'column'}]} >
                            <View style={{flexDirection:'row', marginTop:60, marginBottom:70}} >
                                <View style={{width:230, height:30, marginRight:70, marginLeft:20, borderRadius:20}} />
                                <View style={{width:30, height:30, borderRadius:50}} />
                            </View>
                            <View style={{width:350, height:500, borderTopRightRadius:50, borderBottomRightRadius:50}} >
                                
                            </View>
                        </View>
                    </SkeletonPlasceholder>
                </SafeAreaView>
            )
        } else {            
            return (
                <View style={[styles.container, {backgroundColor:'#5F42AB'}]} >
                    <View style={styles.headerBox} >
                        <View style={{alignSelf:'stretch'}} >
                            <View style={styles.headerContent} >
                                <Text style={styles.headerText} >
                                    My App Features
                                </Text>
                                <TouchableOpacity 
                                    onPress={()=> this.setState({searchVisible: !this.state.searchVisible})}
                                    style={styles.headerButton} >
                                    <Icon name='search' type='FontAwesome' style={styles.headerIcon} />
                                </TouchableOpacity>
                            </View>
                            {this.state.searchVisible === true ? <TextInput 
                                placeholder='write something...'
                                style={styles.headerText2} />:null}
                        </View>
                    </View>
                    <View style={styles.contentBox} >
                        <View style={styles.menuBox} >
                            <TouchableHighlight
                                underlayColor='rgba(0,0,0,0.8)'
                                onPress={()=> this.props.navigation.navigate('Maps')}
                                style={styles.menuButton} >
                                <Icon name='google-maps' type='MaterialCommunityIcons' style={{color:'white'}} />
                            </TouchableHighlight>
                            <Text
                                numberOfLines={1} 
                                style={styles.menuText} >
                                Maps
                            </Text>
                        </View>
                        
                        <View style={styles.menuBox} >
                            <TouchableHighlight
                                underlayColor='rgba(0,0,0,0.8)'
                                onPress={()=> this.props.navigation.navigate('Storage')}
                                style={styles.menuButton} >
                                <Icon name='file-upload' type='MaterialIcons' style={{color:'white'}} />
                            </TouchableHighlight>
                            <Text
                                numberOfLines={1} 
                                style={styles.menuText} >
                                Upload
                            </Text>
                        </View>
                        <View style={styles.menuBox} >
                            <TouchableHighlight
                                underlayColor='rgba(0,0,0,0.8)'
                                onPress={()=> this.props.navigation.navigate('Storage')}
                                style={styles.menuButton} >
                                <Icon name='file-download' type='MaterialIcons' style={{color:'white'}} />
                            </TouchableHighlight>
                            <Text
                                numberOfLines={1} 
                                style={styles.menuText} >
                                Download
                            </Text>
                        </View>
                        <View style={styles.menuBox} >
                            <TouchableHighlight
                                underlayColor='rgba(0,0,0,0.8)'
                                onPress={()=> this.props.navigation.navigate('Chart')}
                                style={styles.menuButton} >
                                <Icon name='areachart' type='AntDesign' style={{color:'white'}} />
                            </TouchableHighlight>
                            <Text
                                numberOfLines={1} 
                                style={styles.menuText} >
                                Chart
                            </Text>
                        </View>
                        <View style={styles.menuBox} >
                            <TouchableHighlight
                                underlayColor='rgba(0,0,0,0.8)'
                                onPress={()=> this.props.navigation.navigate('ListPicture')}
                                style={styles.menuButton} >
                                <Icon name='camera' type='MaterialIcons' style={{color:'white'}} />
                            </TouchableHighlight>
                            <Text
                                numberOfLines={1} 
                                style={styles.menuText} >
                                Camera
                            </Text>
                        </View>
                        <View style={styles.menuBox} >
                            <TouchableHighlight
                                underlayColor='rgba(0,0,0,0.8)'
                                onPress={()=> this.props.navigation.navigate('Barcode')}
                                style={styles.menuButton} >
                                <Icon name='barcode' type='FontAwesome' style={{color:'white'}} />
                            </TouchableHighlight>
                            <Text
                                numberOfLines={1} 
                                style={styles.menuText} >
                                Barcode
                            </Text>
                        </View>
                        <View style={styles.menuBox} >
                            <TouchableHighlight
                                underlayColor='rgba(0,0,0,0.8)'
                                onPress={()=> this.props.navigation.navigate('QRScan')}
                                style={styles.menuButton} >
                                <Icon name='qrcode-scan' type='MaterialCommunityIcons' style={{color:'white'}} />
                            </TouchableHighlight>
                            <Text
                                numberOfLines={1} 
                                style={styles.menuText} >
                                QR Scan
                            </Text>
                        </View>
                        <View style={styles.menuBox} >
                            <TouchableHighlight
                                underlayColor='rgba(0,0,0,0.8)'
                                onPress={()=> this.props.navigation.navigate('Tables')}
                                style={styles.menuButton} >
                                <Icon name='table' type='AntDesign' style={{color:'white'}} />
                            </TouchableHighlight>
                            <Text
                                numberOfLines={1} 
                                style={styles.menuText} >
                                Table
                            </Text>
                        </View>
                        <View style={styles.menuBox} >
                            <TouchableHighlight
                                underlayColor='rgba(0,0,0,0.8)'
                                onPress={()=> this.props.navigation.navigate('Notification')}
                                style={styles.menuButton} >
                                <Icon name='notifications' type='MaterialIcons' style={{color:'white'}} />
                            </TouchableHighlight>
                            <Text
                                numberOfLines={1} 
                                style={styles.menuText} >
                                Notification
                            </Text>
                        </View>
                        <View style={styles.menuBox} >
                            <TouchableHighlight
                                underlayColor='rgba(0,0,0,0.8)'
                                onPress={()=> this.props.navigation.navigate('GoogleLogin')}
                                style={styles.menuButton} >
                                <Icon name='google' type='AntDesign' style={{color:'white'}} />
                            </TouchableHighlight>
                            <Text
                                numberOfLines={1} 
                                style={styles.menuText} >
                                Google Login
                            </Text>
                        </View>
                        <View style={styles.menuBox} >
                            <Transition shared='circle' >
                                <TouchableHighlight
                                    underlayColor='rgba(0,0,0,0.8)'
                                    onPress={()=> this.props.navigation.navigate('Animations')}
                                    style={styles.menuButton} >
                                    <Icon name='play-circle-o' type='FontAwesome' style={{color:'white'}} />
                                </TouchableHighlight>
                            </Transition>
                            <Text
                                numberOfLines={1} 
                                style={styles.menuText} >
                                Animation
                            </Text>
                        </View>
                        <View style={styles.menuBox} >
                            <TouchableHighlight
                                underlayColor='rgba(0,0,0,0.8)'
                                onPress={()=> this.props.navigation.navigate('Chats')}
                                style={styles.menuButton} >
                                <Icon name='message' type='Entypo' style={{color:'white'}} />
                            </TouchableHighlight>
                            <Text
                                numberOfLines={1} 
                                style={styles.menuText} >
                                Chating
                            </Text>
                        </View>
                    </View>
                </View>
            )
        }
    }
}

const mapStateProps = (state) => {
    return {
        MyLocation: state.MyLocation,
        Users: state.Users,
        Files: state.Files
    }
}

const mapDispatchToProps = dispatch => {
    return {
        delData: () => dispatch(actionMyLocation.delData()),
        addData: data => dispatch(actionMyLocation.addData(data)),
        fetchUsers: () => dispatch(actionUsers.requestUserData()),
        fetchFiles: page => dispatch(actionFiles.requestFilesData(page))
    }
}

export default connect(mapStateProps, mapDispatchToProps)(Home)
