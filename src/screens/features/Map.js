import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Dimensions, PermissionsAndroid, TouchableOpacity } from 'react-native'
import {Icon} from 'native-base'
import MapView, {Marker} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import {connect} from 'react-redux'
import * as actionMyLocation from '../../redux/actions/MyLocation'

const GOOGLE_MAPS_APIKEY = 'AIzaSyCPrke9v5gaWHhBkI53kk7tm_DS1EdKJ4A';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -6.227667;
const LONGITUDE = 106.8084708;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
let id = 0;

function log(eventName, e) {
    console.log(eventName, e.nativeEvent);
}

class Maps extends Component {
    
    constructor(props){
        super(props)
        this.state={
            event:1,
            line:false,
            a: {
                latitude: '',
                longitude: '',
            },
            b: {
                latitude: '',
                longitude: '',
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            userLoc: {
                latitude: '',
                longitude: '',
            },
            name:'',
            longitude:'',
            latitude:'',
            location: null,
            markers:[]
        }
        this.onMapPress = this.onMapPress.bind(this)
    }

    onMapPress(e) {
        this.setState({
            markers: [
                ...this.state.markers,
                {
                    coordinate: e.nativeEvent.coordinate,
                    key: `marker ${id++}`,
                },
            ],
        });
    }

    handleSave(e) {
        this.setState({
            markers: [
                ...this.state.markers,
                {
                    coordinate: {longitude:this.state.b.longitude, latitude:this.state.b.latitude},
                    key: `marker ${id++}`,
                    description:`${this.state.name}`
                },
            ],
        })
        this.setState({name:''})
    }

    async setDestination() {
        await this.setState({a:{latitude:this.state.b.latitude,longitude:this.state.b.longitude}})
        await this.setState({line:true})
    }

    async componentWillMount() {
        await this.setState({b:{latitude:this.props.MyLocation.latitude,longitude:this.props.MyLocation.longitude}})
//        await this.setState({a:{latitude:this.props.MyLocation.latitude,longitude:this.props.MyLocation.longitude}})
        await this.setState({longitude:this.props.MyLocation.longitude, latitude:this.props.MyLocation.latitude})
        await this.setState({userLoc:{longitude:this.props.MyLocation.longitude, latitude:this.props.MyLocation.latitude}})
    }
    
    render() {
        return (
            <View style={styles.container}>
                <MapView 
                    style={styles.map}
                    initialRegion={{
                        latitude: this.props.MyLocation.latitude,
                        longitude: this.props.MyLocation.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    //onPress={this.onMapPress}
                    onRegionChange={val => this.setState({b:val})}
                >
                    {this.state.event===2?
                        <Marker
                            coordinate={this.state.userLoc}
                            title='My location'
                            pinColor={'blue'}
                        /> : null
                    }
                    {this.state.event===2&&this.state.a.latitude!==''?
                        <Marker
                            coordinate={this.state.a}
                            title='My destination'
                            pinColor={'red'}
                        /> : null
                    }
                    {this.state.line?
                        <MapViewDirections
                            origin={this.state.userLoc}
                            destination={this.state.a}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={2}
                            strokeColor='hotpink'
                        /> : null
                    }
                    {this.state.event===3?
                        this.state.markers.map((marker) => (
                            <Marker
                                title={marker.description}
                                key={marker.key}
                                coordinate={marker.coordinate}
                                pinColor={'gold'}
                            />
                        )) : null
                    }
                </MapView>
                {this.state.event===2?
                    <View style={styles.markerFixed} >
                        <Icon name='location-pin' type='Entypo' style={{fontSize:40, color:'red'}} />
                    </View> : null
                }
                {this.state.event===3?
                    <View style={styles.markerFixed} >
                        <Icon name='location-pin' type='Entypo' style={{fontSize:40, color:'red'}} />
                    </View> : null
                }
                <View style={{position:'absolute', top:10, padding:20}} >
                    <View style={{marginBottom:20, borderRadius:40, backgroundColor:'rgba(255,255,255,0.9)', width:350, alignItems:'center',justifyContent:'center'}} >
                        <Text 
                            style={{fontSize:18,margin:10}} >
                            longitude: {this.state.longitude === '' ? 'Please move the marker' : this.state.b.longitude}
                        </Text>
                    </View>
                    <View style={{marginBottom:20, borderRadius:40, backgroundColor:'rgba(255,255,255,0.9)', width:350, alignItems:'center',justifyContent:'center'}} >
                        <Text style={{fontSize:18,margin:10}} >
                            latitude: {this.state.latitude === '' ? 'Please move the markaer' : this.state.b.latitude}
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    {this.state.event === 1 ?
                        <View>
                            <TouchableOpacity
                                onPress={() => this.setState({event:2})}
                                style={styles.bubble}
                            >
                                <Text>Map Directioner</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.setState({event:3})}
                                style={styles.bubble}
                            >
                                <Text>Map Marker</Text>
                            </TouchableOpacity>
                        </View> : null
                    }
                    {this.state.event === 2 ?
                        <View>
                            <TouchableOpacity
                                onPress={() => this.setDestination()}
                                style={styles.bubble}
                            >
                                <Text>Set Destination</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.setState({event:1})}
                                style={styles.bubble}
                            >
                                <Text style={{color:'red'}} >Back</Text>
                            </TouchableOpacity>
                        </View> : null
                    }
                    {this.state.event === 3 ?
                        <View>
                            <View style={{marginBottom:20, borderRadius:40, backgroundColor:'rgba(255,255,255,0.7)', width:350, alignItems:'center',justifyContent:'center'}} >
                                <TextInput
                                    style={{fontSize:18,textAlign:'center'}}
                                    placeholder='Name of marker'
                                    onChangeText={(val) => this.setState({name:val})}
                                    value={this.state.name}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => this.handleSave()}
                                style={styles.bubble}
                            >
                                <Text>Save Marker</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.setState({event:1})}
                                style={styles.bubble}
                            >
                                <Text style={{color:'red'}} >Back</Text>
                            </TouchableOpacity>
                        </View> : null
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    markerFixed: {
        left: '50%',
        marginLeft: -20,
        marginTop: -40,
        position: 'absolute',
        top: '50%'
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
        alignItems:'center',
        margin:10,
    },
    buttonContainer: {
        flexDirection: 'column',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});

const mapStateProps = (state) => {
    return {
        MyLocation: state.MyLocation
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addData: data => dispatch(actionMyLocation.addData(data))
    }
}

export default connect(mapStateProps, mapDispatchToProps)(Maps)
