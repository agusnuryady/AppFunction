import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, Dimensions, PermissionsAndroid, TouchableOpacity } from 'react-native'
import {Icon} from 'native-base'
import MapView from 'react-native-maps'
import {Marker} from 'react-native-maps'
import {connect} from 'react-redux'
import * as actionMyLocation from '../../redux/actions/MyLocation'

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
            a: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
            },
            b: {
                latitude: '',
                longitude: '',
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
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

    async componentWillMount() {
        this.setState({b:{latitude:this.props.MyLocation.latitude,longitude:this.props.MyLocation.longitude}})
        this.setState({longitude:this.props.MyLocation.longitude, latitude:this.props.MyLocation.latitude})
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
                    {/* <Marker
                        draggable
                        coordinate={this.state.b}
                        onSelect={e => log('onSelect', e)}
                        //onDrag={e => log('onDrag', e)}
                        onDragStart={e => log('onDragStart', e)}
                        onDragEnd={e => this.setState({longitude:e.nativeEvent.coordinate.longitude, latitude:e.nativeEvent.coordinate.latitude})}
                        onPress={e => log('onPress', e)}
                    /> */}
                    {this.state.markers.map((marker) => (
                        <Marker
                            title={marker.description}
                            key={marker.key}
                            coordinate={marker.coordinate}
                            pinColor={'gold'}
                        />
                    ))}
                </MapView>
                <View style={styles.markerFixed} >
                    <Icon name='location-pin' type='Entypo' style={{fontSize:40, color:'red'}} />
                </View>
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
                    {/* <TouchableOpacity
                        onPress={() => this.setState({ markers: [] })}
                        style={styles.bubble}
                    >
                        <Text>Tap to create a marker of random color</Text>
                    </TouchableOpacity> */}
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
        alignItems:'center'
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