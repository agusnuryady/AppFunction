import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import {Icon} from 'native-base'
import {connect} from 'react-redux'

import * as actionChats from '../../../redux/actions/ChatList'

class ListChats extends Component {

    constructor(props){
        super(props)
        this.state={
            
        }        
    }

    componentDidMount() {
        this.props.fetchRooms()
    }

    _handlerCreateRoom = async () => {
        const room = this.props.createRoom()
        console.log(room)
        //await this.props.navigation.navigate('Chats', { id: room.uuid })
    }

    _renderCard = ({ item }) => (
        <TouchableOpacity
            onPress={()=> this.props.navigation.navigate('Chats', { id: item.uuid })}
            style={{position:'relative', flexDirection:'row', alignItems:'center', paddingVertical:10, paddingHorizontal:20, borderBottomWidth:0.5, borderBottomColor:'#bbb'}} 
        >
            <View style={{backgroundColor:'#E6E6E6', borderRadius:50}} >
                <Icon name="user" type="Entypo" style={{padding:10, fontSize:40}} />
            </View>
            <Text style={{marginLeft:20, fontSize:18, fontWeight:'bold', color:'black'}} >{item.uuid}</Text>
        </TouchableOpacity>
    )

    render() {
        return (
            <View style={{flex:1, flexDirection:'column', width:'100%'}} >
                <View style={{backgroundColor:'#5F42AB', flexDirection:'row', alignItems:'center', justifyContent:'center', height:60}} >
                    <TouchableOpacity 
                        onPress={()=> this.props.navigation.navigate('Home')}
                        style={{position:'absolute', left:0}} >
                        <Icon name="arrowleft" type="AntDesign" style={{color:'white', padding:10, fontSize:35}} />
                    </TouchableOpacity>
                    <Text style={{color:'white', fontSize:25, fontWeight:'bold'}} >Inbox</Text>
                    <TouchableOpacity 
                        onPress={() => this._handlerCreateRoom()}
                        style={{position:'absolute', right:0}} 
                    >
                        <Icon name="message-plus" type="MaterialCommunityIcons" style={{color:'white', padding:10, fontSize:30}} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.props.Rooms.data}
                    renderItem={this._renderCard}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}

const mapStateProps = (state) => {
    return {
        Rooms: state.Rooms
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchRooms: () => dispatch(actionChats.showRooms()),
        createRoom: () => dispatch(actionChats.createRoom())
    }
}

export default connect(mapStateProps, mapDispatchToProps)(ListChats)