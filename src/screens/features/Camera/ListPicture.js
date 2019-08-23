import React, { Component } from 'react'
import { Text, View, TouchableHighlight, FlatList, Image, Dimensions, } from 'react-native'
import {Icon, Content} from 'native-base'
import {connect} from 'react-redux'

var { width, height } = Dimensions.get('window')

class ListPicture extends Component {
    
    render() {
        console.log(this.props.ListImage.data);
        
        return (
            <View style={{flex:1, margin:0}} >
                <View style={{backgroundColor:'#5F42AB', alignItems:'center', justifyContent:'center', elevation:5}} >
                    <Text style={{fontSize:22, fontWeight:'bold', color:'white', margin:15}} >
                        IMAGE GALLERY
                    </Text>
                </View>
                <Content>
                    <FlatList
                        data={this.props.ListImage.data}
                        renderItem={({item}) => (
                            <View style={{paddingTop:40, borderBottomWidth:0.8, borderBottomColor:'#f5f5f5', borderRadius:10}} >
                                <Image
                                    style={{width:width, height:300}}
                                    source={{uri:item.uri}}
                                />
                                <Text style={{fontSize:20, fontWeight:'bold', marginHorizontal:15, marginVertical:10}} >
                                    {item.name}
                                </Text>
                                <Text style={{fontSize:16, marginHorizontal:15, marginBottom:20}} >
                                    {item.description}
                                </Text>
                            </View>
                        )}
                        keyExtractor={item => {
                            return item.id.toString()
                        }}
                    />
                </Content>
                <TouchableHighlight
                    underlayColor='rgba(0,0,0,0.8)'
                    onPress={()=> this.props.navigation.navigate('Camera')}
                    style={{backgroundColor:'#5F42AB',borderRadius:50,marginBottom:5,width:70,height:70,alignItems:'center',justifyContent:'center',position:'absolute',bottom:20,right:20}} >
                    <Icon name='camera' type='FontAwesome' style={{color:'white'}} />
                </TouchableHighlight>
            </View>
        )
    }
}

const mapStateProps = (state) => {
    return {
        ListImage: state.ListImage
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateProps, mapDispatchToProps)(ListPicture)