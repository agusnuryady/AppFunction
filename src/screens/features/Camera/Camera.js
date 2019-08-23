import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, CameraRoll, ActivityIndicator } from 'react-native'
import {Icon} from 'native-base'
import {StackActions, NavigationActions} from 'react-navigation'
import {RNCamera} from 'react-native-camera'
import RNFS from 'react-native-fs'

export default class Camera extends Component {

    constructor(props){
        super(props)
        this.state={
            processing:false,
            cameraType:"back",
            flashMode:"on",
        }
    }

    changeCameraType() {
        if (this.state.cameraType === 'back') {
            this.setState({cameraType: 'front'})
        } else {
            this.setState({cameraType: 'back'})
        }
    }

    changeFlashMode() {
        if (this.state.flashMode === 'on') {
            this.setState({flashMode: 'off'})
        } else {
            this.setState({flashMode: 'on'})
        }
    }

    render() {

        let button = (
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                <Icon name='camera' type='FontAwesome' style={{color:'white', fontSize:40}} />
            </TouchableOpacity>
        )

        if (this.state.processing) {
            button = (
                <View style={styles.capture}>
                    <ActivityIndicator animating size={20} />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={this.state.cameraType}
                    flashMode={this.state.flashMode}
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
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes);
                    }}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.changeFlashMode.bind(this)} style={[styles.capture, {position:'absolute', left:10}]}>
                        <Icon name={this.state.flashMode === "on" ? "flash-off" : "flash"} type='MaterialCommunityIcons' style={{color:'white', fontSize:30}} />
                    </TouchableOpacity>
                    {button}
                    <TouchableOpacity onPress={this.changeCameraType.bind(this)} style={[styles.capture, {position:'absolute', right:10}]}>
                        <Icon name="camera-switch" type='MaterialCommunityIcons' style={{color:'white', fontSize:30}} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    takePicture = async() => {
        if (this.camera) {
            const options = { quality: 0.5, forceUpOrientation: true, fixOrientation: true,};
            const data = await this.camera.takePictureAsync(options)
            this.setState({processing:true})
            await CameraRoll.saveToCameraRoll(data.uri, "photo")
            console.log(data.uri);
            RNFS.unlink(data.uri)
            await CameraRoll.getPhotos({first:1,assetType:'Photos'}).then(r => {
                console.log(r.edges[0].node.image.uri);
                this.props.navigation.dispatch(StackActions.reset({
                    index:0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'SaveImage', params: {uri:r.edges[0].node.image.uri} })
                    ]
                }))
                //this.props.navigation.navigate('SaveImage', {uri:r.edges[0].node.image.uri})
            })
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: 'transparent',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});