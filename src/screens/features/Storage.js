import React, { Component } from 'react'
import { ActivityIndicator, Text, View, TouchableHighlight, TouchableOpacity, FlatList, Image, Dimensions, Alert} from 'react-native'
import {Icon, Content} from 'native-base'
import {connect} from 'react-redux'
import RNFetchBlob from 'react-native-fetch-blob'
import axios from 'axios'
import * as actionFiles from '../../redux/actions/Files'

var { width, height } = Dimensions.get('window')

class Storage extends Component {

    constructor(props){
        super(props)
        this.state={
            refreshFiles:false,
            id:'',
            loading: false,
        }
    }

    async componentWillMount() {
        await this.props.clearFiles()
        await this.props.fetchFiles(1)
    }

    fetchingFiles = async ()=> {
            await this.props.fetchFiles(this.props.Files.page + 1)
            await this.setState({refreshFiles:false,loading:false})
    }

    async onRefreshFiles() {
        this.setState({refreshFiles:true}, function() {this.fetchingFiles()})
    }

    async onLoadMore() {
        this.setState({loading:true}, function() {this.fetchingFiles()})
    }

    async downloadFile(uri) {
        var date      = new Date()
        var url       = `http://appexperiment.herokuapp.com/api/v1/file/download/${uri}`
        const { config, fs } = RNFetchBlob
        let PictureDir = fs.dirs.PictureDir // this is the pictures directory. You can check the available directories in the wiki.
        let options = {
        fileCache: true,
        addAndroidDownloads : {
            useDownloadManager : true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
            notification : true,
            path:  PictureDir + "/image_"+Math.floor(date.getTime() + date.getSeconds() / 2), // this is the path where your downloaded file will live in
            description : 'Downloading File...'
        }
        }
        config(options).fetch('GET', url).then((res) => {
            Alert.alert("Success Downloaded")
            console.log(res.data);
        })
    }

    async deleteFile(id) {
        try {
            await axios.delete(`http://appexperiment.herokuapp.com/api/v1/file/delete/${id}`)
        } catch (e) {
            console.log(e); 
        }
        await this.props.clearFiles()
        await alert('data berhasil dihapus')
        await this.props.fetchFiles(1)
    }

    renderFooter() {
        return (
            //Footer View with Load More button
            <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row',}}>
                <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.onLoadMore()}
                disabled={this.state.loading}
                //On Click of button calling loadMoreData function to load more data
                style={{padding: 10, backgroundColor: '#5F42AB', borderRadius: 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{color: 'white', fontSize: 15, textAlign: 'center',}}>Load More</Text>
                {this.state.loading ? (
                    <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
                ) : null}
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        console.log(this.props.Files.data);
        console.log(this.props.Files.page);
        if (this.props.Files.isLoading) {
            return (
                <View style={{flex:1, margin:0}} >
                    <ActivityIndicator
                        animating={this.props.Files.isLoading}
                        color="#19FAC2"
                        size="large"
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: height
                        }}
                    />
                </View>
            )
        } else {    
            return (
                <View style={{flex:1, margin:0}} >
                    <View style={{backgroundColor:'#5F42AB', alignItems:'center', justifyContent:'center', elevation:5}} >
                        <TouchableHighlight 
                            underlayColor='rgba(0,0,0,0.8)'
                            onPress={() => this.props.navigation.navigate('Home')}
                            style={{padding:5, position:'absolute', left:0}} >
                            <Icon name='left' type='AntDesign' style={{color:'white'}} />
                        </TouchableHighlight>
                        <Text style={{fontSize:22, fontWeight:'bold', color:'white', margin:15}} >
                            Files Storage
                        </Text>
                    </View>
                    <Content>
                        <View>
                            <FlatList
                                onRefresh={() => this.onRefreshFiles()}
                                refreshing={this.state.refreshFiles}
                                data={this.props.Files.data}
                                renderItem={({item}) => (
                                    <View style={{paddingTop:40, borderBottomWidth:0.8, borderBottomColor:'#f5f5f5', borderRadius:10}} >
                                        <Image
                                            style={{width:width, height:300}}
                                            source={{uri:`http://appexperiment.herokuapp.com/upload/files/${item.file}`}}
                                        />
                                        <Text style={{fontSize:20, fontWeight:'bold', marginHorizontal:15, marginVertical:10}} >
                                            {item.name}
                                        </Text>
                                        <Text style={{fontSize:16, marginHorizontal:15, marginVertical:10}} >
                                            {item.description}
                                        </Text>
                                        <View style={{flexDirection:'row'}} >
                                            <TouchableOpacity
                                                onPress={() => this.downloadFile(item.file)}
                                                style={{flexDirection:'row', marginHorizontal:15, marginBottom:5}} >
                                                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                                                    <Icon name='download' type='Entypo' style={{color:'blue'}} />
                                                    <Text style={{color:'blue', fontSize:17, marginLeft:5}} >
                                                        Download
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => this.deleteFile(item.id)}
                                                style={{flexDirection:'row', marginHorizontal:15, marginBottom:5, position:'absolute', right:0}} >
                                                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                                                    <Text style={{color:'red', fontSize:17, marginRight:5}} >
                                                        Delete
                                                    </Text>
                                                    <Icon name='delete' type='AntDesign' style={{color:'red'}} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                                ItemSeparatorComponent={() => <View style={{height: 0.5, backgroundColor: 'rgba(0,0,0,0.4)',}} />}
                                ListFooterComponent={this.renderFooter.bind(this)}
                                keyExtractor={item => {
                                    return item.id.toString()
                                }}
                            />
                        </View>
                    </Content>
                    <TouchableHighlight
                        underlayColor='rgba(0,0,0,0.8)'
                        onPress={()=> this.props.navigation.navigate('Upload')}
                        style={{backgroundColor:'#5F42AB',borderRadius:50,marginBottom:5,width:70,height:70,alignItems:'center',justifyContent:'center',position:'absolute',bottom:20,right:20}} >
                        <Icon name='upload' type='Entypo' style={{color:'white'}} />
                    </TouchableHighlight>
                </View>
            )
        }
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

export default connect(mapStateProps, mapDispatchToProps)(Storage)