import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, PermissionsAndroid } from 'react-native'
import MapView from 'react-native-maps'
import {Marker} from 'react-native-maps'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -6.227667;
const LONGITUDE = 106.8084708;
const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

function log(eventName, e) {
    console.log(eventName, e.nativeEvent);
}

export default class Map extends Component {
    
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
            },
            longitude:'',
            latitude:'',
            location: null
        }
    }

    async componentWillMount() {
        const {navigation} = this.props
        this.setState({longitude:navigation.getParam('longitude',''), latitude:navigation.getParam('latitude','')})
        this.setState({b:{latitude:navigation.getParam('latitude',''),longitude:navigation.getParam('longitude','')}})

    }
    
    render() {
        console.log(this.state.longitude)
        console.log(this.state.b)
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    <Marker
                        draggable
                        coordinate={this.state.b}
                        onSelect={e => log('onSelect', e)}
                        //onDrag={e => log('onDrag', e)}
                        onDragStart={e => log('onDragStart', e)}
                        onDragEnd={e => this.setState({longitude:e.nativeEvent.coordinate.longitude, latitude:e.nativeEvent.coordinate.latitude})}
                        onPress={e => log('onPress', e)}
                    />
                </MapView>
                <View style={{position:'absolute', top:10, padding:20}} >
                    <View style={{marginBottom:20, borderRadius:40, backgroundColor:'rgba(255,255,255,0.9)', width:350, alignItems:'center',justifyContent:'center'}} >
                        <Text 
                            style={{fontSize:18,margin:10}} >
                            longitude: {this.state.longitude === '' ? 'Please move the marker' : this.state.longitude}
                        </Text>
                    </View>
                    <View style={{marginBottom:20, borderRadius:40, backgroundColor:'rgba(255,255,255,0.9)', width:350, alignItems:'center',justifyContent:'center'}} >
                        <Text style={{fontSize:18,margin:10}} >
                            latitude: {this.state.latitude === '' ? 'Please move the markaer' : this.state.latitude}
                        </Text>
                    </View>
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
});