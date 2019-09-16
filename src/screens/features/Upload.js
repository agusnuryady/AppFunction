import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import {StackActions, NavigationActions} from 'react-navigation'
import {connect} from 'react-redux'
import * as actionFiles from '../../redux/actions/Files'

const options = {
    title: 'Select a photo',
    takePhotoButtonTittle: 'Take a photo',
    chooseFromLibraryButtonTittle: 'Choose from gallery',
    quality: 1
}

class Upload extends Component {

    constructor(props){
        super(props)
        this.state={
            imageUri: null,
            data: null,
            name:'',
            description:'',
        }
    }

    selectPhoto() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log("Response = ", response);

            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else {
                let source = response.uri

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    imageUri: source,
                    data: response.data
                });
            }
        });
    }

    async sendPhoto() {
        if (this.state.imageUri===null) {
            alert('Please Upload Image')
        } else {
            await RNFetchBlob.fetch("POST", "http://appexperiment.herokuapp.com/api/v1/file/create", {
                otherHeader : "foo",
                'Content-Type': 'multipart/form-data',
            }, [
                {name: 'file', filename: 'image.jpg', data: RNFetchBlob.wrap(this.state.imageUri)},
                {name: 'name', data: this.state.name},
                {name: 'description', data: this.state.description},
            ])
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err, 'err');
            })
            await this.props.clearFiles()
            await this.props.navigation.dispatch(StackActions.reset({
                index:0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Storage' })
                ]
            }))
        }

    }

    render() {
        console.log(this.state.imageUri);
        return (
            <View style={{flex:1, margin:0}} >
                <View style={{backgroundColor:'#5F42AB', alignItems:'center', justifyContent:'center', elevation:5}} >
                    <Text style={{fontSize:22, fontWeight:'bold', color:'white', margin:15}} >
                        Upload Image
                    </Text>
                </View>
                <View style={{alignItems:'center', justifyContent:'center', padding:20}} >
                    <Image
                        style={{width:200, height:200, margin:15}}
                        source={{uri:this.state.imageUri}}
                    />
                    <TouchableOpacity
                        onPress={this.selectPhoto.bind(this)}
                        style={{margin:15, paddingHorizontal:30, paddingVertical:10, alignItems:'center', backgroundColor:'#e5e5e5', borderRadius:20}}
                    >
                        <Text>
                            Select Image
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        style={{fontSize:20, alignSelf:'stretch', color:'black', padding:5, marginVertical:25, marginHorizontal:10, borderBottomColor:'gray', borderBottomWidth:1}}
                        onChangeText={(text) => this.setState({name: text})}
                        value={this.state.name}
                        placeholder="Name"
                    />
                    <TextInput
                        style={{fontSize:20, alignSelf:'stretch', color:'black', padding:5, marginVertical:25, marginHorizontal:10, borderBottomColor:'gray', borderBottomWidth:1}}
                        onChangeText={(text) => this.setState({description: text})}
                        value={this.state.description}
                        placeholder="Description"
                    />
                    <TouchableOpacity
                        onPress={this.sendPhoto.bind(this)}
                        style={{margin:15, paddingHorizontal:30, paddingVertical:10, alignItems:'center', backgroundColor:'#e5e5e5', borderRadius:20}}
                    >
                        <Text>
                            Upload
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateProps = (state) => {
    return {
        Files: state.Files,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchFiles: page => dispatch(actionFiles.requestFilesData(page)),
        clearFiles: () => dispatch(actionFiles.clearFilesData()),
    }
}

export default connect(mapStateProps, mapDispatchToProps)(Upload)