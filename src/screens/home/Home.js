import React, { Component } from 'react'
import {StatusBar, PermissionsAndroid,StyleSheet,ActivityIndicator,View,Text,TextInput,Alert,TouchableHighlight,TouchableOpacity,TouchableWithoutFeedback,Dimensions,Image} from 'react-native'
import {Icon,Header,Content,Container,Thumbnail} from 'native-base'

var { width, height } = Dimensions.get('window')

export default class Home extends Component {
    
    constructor(props){
        super(props)
        this.state={
            searchVisible: false,
            longitude:'',
            latitude:'',
        }
    }

    async componentDidMount() {
        await this.findCurrentLocation()
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
                    this.setState({longitude:position.coords.longitude, latitude:position.coords.latitude})
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
        console.log(this.state.longitude);
        return (
            <View style={{flex:1,margin:0,backgroundColor:'#5F42AB'}} >
                <View style={{height:'20%',width:width,alignItems:'center',justifyContent:'center'}} >
                    <View style={{alignSelf:'stretch'}} >
                        <View style={{flexDirection:'row',marginHorizontal:30,marginBottom:10,alignItems:'center'}} >
                            <Text style={{fontSize:22,fontWeight:'bold',color:'white'}} >
                                My App Features
                            </Text>
                            <TouchableOpacity 
                                onPress={()=> this.setState({searchVisible: !this.state.searchVisible})}
                                style={{position:'absolute',right:5}} >
                                <Icon name='search' type='FontAwesome' style={{color:'white',fontSize:20}} />
                            </TouchableOpacity>
                        </View>
                        {this.state.searchVisible === true ? <TextInput 
                            placeholder='write something...'
                            style={{backgroundColor:'rgba(255,255,255,0.7)',borderColor:'gray',borderWidth:0.5,fontSize:15,marginHorizontal:20,paddingVertical:5,paddingHorizontal:15,borderRadius:50}} />:null}
                    </View>
                </View>
                <View style={{flexDirection:'row',flexWrap:'wrap',backgroundColor:'white',height:'70%',marginRight:30,borderBottomRightRadius:50,borderTopRightRadius:50}} >
                    <View style={{alignItems:'center',margin:15}} >
                        <TouchableHighlight
                            underlayColor='rgba(0,0,0,0.8)'
                            onPress={()=> this.props.navigation.navigate('Map', {longitude:this.state.longitude, latitude:this.state.latitude})}
                            style={{backgroundColor:'#5F42AB',borderRadius:50,marginBottom:5,width:50,height:50,justifyContent:'center',alignItems:'center'}} >
                            <Icon name='google-maps' type='MaterialCommunityIcons' style={{color:'white'}} />
                        </TouchableHighlight>
                        <Text
                            numberOfLines={1} 
                            style={{width:60,fontSize:15,textAlign:'center'}} >
                            Maps
                        </Text>
                    </View>
                    <View style={{alignItems:'center',margin:15}} >
                        <TouchableHighlight
                            underlayColor='rgba(0,0,0,0.8)'
                            onPress={()=> this.props.navigation.navigate('Upload')}
                            style={{backgroundColor:'#5F42AB',borderRadius:50,marginBottom:5,width:50,height:50,justifyContent:'center',alignItems:'center'}} >
                            <Icon name='file-upload' type='MaterialIcons' style={{color:'white'}} />
                        </TouchableHighlight>
                        <Text
                            numberOfLines={1} 
                            style={{width:60,fontSize:15,textAlign:'center'}} >
                            Upload
                        </Text>
                    </View>
                    <View style={{alignItems:'center',margin:15}} >
                        <TouchableHighlight
                            underlayColor='rgba(0,0,0,0.8)'
                            onPress={()=> alert('Pressed!')}
                            style={{backgroundColor:'#5F42AB',borderRadius:50,marginBottom:5,width:50,height:50,justifyContent:'center',alignItems:'center'}} >
                            <Icon name='file-download' type='MaterialIcons' style={{color:'white'}} />
                        </TouchableHighlight>
                        <Text
                            numberOfLines={1} 
                            style={{width:60,fontSize:15,textAlign:'center'}} >
                            Download
                        </Text>
                    </View>
                    <View style={{alignItems:'center',margin:15}} >
                        <TouchableHighlight
                            underlayColor='rgba(0,0,0,0.8)'
                            onPress={()=> alert('Pressed!')}
                            style={{backgroundColor:'#5F42AB',borderRadius:50,marginBottom:5,width:50,height:50,justifyContent:'center',alignItems:'center'}} >
                            <Icon name='areachart' type='AntDesign' style={{color:'white'}} />
                        </TouchableHighlight>
                        <Text
                            numberOfLines={1} 
                            style={{width:60,fontSize:15,textAlign:'center'}} >
                            Chart
                        </Text>
                    </View>
                    <View style={{alignItems:'center',margin:15}} >
                        <TouchableHighlight
                            underlayColor='rgba(0,0,0,0.8)'
                            onPress={()=> alert('Pressed!')}
                            style={{backgroundColor:'#5F42AB',borderRadius:50,marginBottom:5,width:50,height:50,justifyContent:'center',alignItems:'center'}} >
                            <Icon name='camera' type='MaterialIcons' style={{color:'white'}} />
                        </TouchableHighlight>
                        <Text
                            numberOfLines={1} 
                            style={{width:60,fontSize:15,textAlign:'center'}} >
                            Camera
                        </Text>
                    </View>
                    <View style={{alignItems:'center',margin:15}} >
                        <TouchableHighlight
                            underlayColor='rgba(0,0,0,0.8)'
                            onPress={()=> alert('Pressed!')}
                            style={{backgroundColor:'#5F42AB',borderRadius:50,marginBottom:5,width:50,height:50,justifyContent:'center',alignItems:'center'}} >
                            <Icon name='barcode' type='FontAwesome' style={{color:'white'}} />
                        </TouchableHighlight>
                        <Text
                            numberOfLines={1} 
                            style={{width:60,fontSize:15,textAlign:'center'}} >
                            Barcode
                        </Text>
                    </View>
                    <View style={{alignItems:'center',margin:15}} >
                        <TouchableHighlight
                            underlayColor='rgba(0,0,0,0.8)'
                            onPress={()=> alert('Pressed!')}
                            style={{backgroundColor:'#5F42AB',borderRadius:50,marginBottom:5,width:50,height:50,justifyContent:'center',alignItems:'center'}} >
                            <Icon name='qrcode-scan' type='MaterialCommunityIcons' style={{color:'white'}} />
                        </TouchableHighlight>
                        <Text
                            numberOfLines={1} 
                            style={{width:60,fontSize:15,textAlign:'center'}} >
                            QR Scan
                        </Text>
                    </View>
                    <View style={{alignItems:'center',margin:15}} >
                        <TouchableHighlight
                            underlayColor='rgba(0,0,0,0.8)'
                            onPress={()=> alert('Pressed!')}
                            style={{backgroundColor:'#5F42AB',borderRadius:50,marginBottom:5,width:50,height:50,justifyContent:'center',alignItems:'center'}} >
                            <Icon name='music' type='Feather' style={{color:'white'}} />
                        </TouchableHighlight>
                        <Text
                            numberOfLines={1} 
                            style={{width:60,fontSize:15,textAlign:'center'}} >
                            Music
                        </Text>
                    </View>
                    <View style={{alignItems:'center',margin:15}} >
                        <TouchableHighlight
                            underlayColor='rgba(0,0,0,0.8)'
                            onPress={()=> this.props.navigation.navigate('Notification')}
                            style={{backgroundColor:'#5F42AB',borderRadius:50,marginBottom:5,width:50,height:50,justifyContent:'center',alignItems:'center'}} >
                            <Icon name='notifications' type='MaterialIcons' style={{color:'white'}} />
                        </TouchableHighlight>
                        <Text
                            numberOfLines={1} 
                            style={{width:60,fontSize:15,textAlign:'center'}} >
                            Notification
                        </Text>
                    </View>
                    <View style={{alignItems:'center',margin:15}} >
                        <TouchableHighlight
                            underlayColor='rgba(0,0,0,0.8)'
                            onPress={()=> alert('Pressed!')}
                            style={{backgroundColor:'#5F42AB',borderRadius:50,marginBottom:5,width:50,height:50,justifyContent:'center',alignItems:'center'}} >
                            <Icon name='table' type='AntDesign' style={{color:'white'}} />
                        </TouchableHighlight>
                        <Text
                            numberOfLines={1} 
                            style={{width:60,fontSize:15,textAlign:'center'}} >
                            Table
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}
