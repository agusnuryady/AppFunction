import React, { Component } from 'react'
import { StyleSheet, Text, View, Alert, TouchableOpacity, CameraRoll, ActivityIndicator } from 'react-native'
import {Icon} from 'native-base'
import {StackActions, NavigationActions} from 'react-navigation'
import {RNCamera} from 'react-native-camera'
import RNFS from 'react-native-fs'

export default class Barcode extends Component {

    constructor(props){
        super(props)
        this.state={
            barcodes: [],
        }
    }

    onBarCodeRead = (e) => {
        Alert.alert("Barcode value is" + e.data, "Barcode type is" + e.type);
    }

    render() {
        console.log(this.state.barcodes);
        
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={"back"}
                    flashMode={"off"}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onBarCodeRead={this.onBarCodeRead}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        width: '100%',
    },
});