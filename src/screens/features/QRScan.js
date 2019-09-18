import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, CameraRoll, ActivityIndicator } from 'react-native'
import {Icon} from 'native-base'
import {StackActions, NavigationActions} from 'react-navigation'
import {RNCamera} from 'react-native-camera'
import RNFS from 'react-native-fs'

export default class QRScan extends Component {
    
    constructor(props){
        super(props)
        this.state={
            barcodes: [],
        }
    }

    barcodeRecognized = ({ barcodes }) => this.setState({ barcodes })

    renderBarcodes = () => (
        <View>
            {this.state.barcodes.map(this.renderBarcode)}
        </View>
    )

    renderBarcode = ({ bounds, data }) => (
        <React.Fragment key={data + bounds.origin.x}>
            <View
                style={{
                borderWidth: 2,
                borderRadius: 10,
                position: 'absolute',
                borderColor: '#F00',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: 10,
                ...bounds.size,
                left: bounds.origin.x,
                top: bounds.origin.y,
                }}
            >
                <Text style={{
                color: '#F00',
                flex: 1,
                position: 'absolute',
                textAlign: 'center',
                backgroundColor: 'transparent',
                }}>{data}</Text>
            </View>
        </React.Fragment>
    )

    render() {
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
                    onGoogleVisionBarcodesDetected={this.barcodeRecognized}
                >
                    {this.renderBarcodes()}
                </RNCamera>
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