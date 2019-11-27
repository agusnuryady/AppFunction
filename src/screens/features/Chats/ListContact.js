import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import {Icon} from 'native-base'

const data = [
    {
        "id": 1,
        "first_name": "Zelig",
        "last_name": "Greensitt",
        "email": "zgreensitt0@1688.com",
        "gender": "Male",
        "ip_address": "12.214.55.40"
    }, {
        "id": 2,
        "first_name": "Mattheus",
        "last_name": "Peterffy",
        "email": "mpeterffy1@facebook.com",
        "gender": "Male",
        "ip_address": "57.175.47.6"
    }, {
        "id": 3,
        "first_name": "Joanie",
        "last_name": "Piercy",
        "email": "jpiercy2@google.co.uk",
        "gender": "Female",
        "ip_address": "190.8.130.109"
    }, {
        "id": 4,
        "first_name": "Ofella",
        "last_name": "Balch",
        "email": "obalch3@nih.gov",
        "gender": "Female",
        "ip_address": "84.147.217.52"
    }, {
        "id": 5,
        "first_name": "Cecilius",
        "last_name": "Ellsom",
        "email": "cellsom4@bbc.co.uk",
        "gender": "Male",
        "ip_address": "61.63.97.150"
    }
]

export default class ListContact extends Component {

    _renderCard = ({ item }) => (
        <TouchableOpacity 
            style={{position:'relative', flexDirection:'row', alignItems:'center', paddingVertical:10, paddingHorizontal:20, borderBottomWidth:0.5, borderBottomColor:'#bbb'}} 
        >
            <View style={{backgroundColor:'#E6E6E6', borderRadius:50}} >
                <Icon name="user" type="Entypo" style={{padding:10, fontSize:40}} />
            </View>
            <Text style={{marginLeft:20, fontSize:18, fontWeight:'bold', color:'black'}} >{item.first_name}</Text>
        </TouchableOpacity>
    )

    render() {
        return (
            <View style={{flex:1, flexDirection:'column', width:'100%'}} >
                <View style={{backgroundColor:'#5F42AB', flexDirection:'row', alignItems:'center', justifyContent:'center', height:60}} >
                    <TouchableOpacity 
                        onPress={()=> this.props.navigation.navigate('ListChats')}
                        style={{position:'absolute', left:0}} >
                        <Icon name="arrowleft" type="AntDesign" style={{color:'white', padding:10, fontSize:35}} />
                    </TouchableOpacity>
                    <Text style={{color:'white', fontSize:25, fontWeight:'bold'}} >My Contact</Text>
                </View>
                <FlatList
                    data={data}
                    renderItem={this._renderCard}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        )
    }
}
