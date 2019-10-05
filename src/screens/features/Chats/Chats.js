import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, FlatList, TextInput, TouchableOpacity } from 'react-native'
import {Icon} from 'native-base'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

var {width,height}=Dimensions.get('window')

export default class Chats extends Component {
    
    constructor(props){
        super(props)
        this.state={
            messages:[],
            textInput:'',
            token:'',
            group:[],
            id_user:'',
            id_chats:'',
            chatItem:'',
        }       
    }

    componentDidMount() {
        // AsyncStorage.getItem('tokenJwt', (err, result) => {
        //     if (result) {
        //         this.setState({
        //             token: result
        //         })
        //     }
        // })
        // this.fetchUser()
        // this.fetchRoom()
        // this.fetchMessages()
    }

    fetchUser = ()=> {
        axios({
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${this.state.token}`,
                "content-type":"appilcation/json"
            },
            url:url+'users/user',
        })
        .then(res => {this.setState({id_user: res.data.id})})
        this.setState({isFetching:false})
    }

    fetchRoom = ()=> {
        sendData = async ()=> {
            await axios({
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${this.state.token}`
                },
                url:`${url}users/room/${this.props.id}`
            })
            .then(res => {
                this.setState({group: res.data})
            })
            this.setState({isFetching:false})
        }
        sendData()
    }

    fetchMessages = ()=> {
        sendData = async ()=> {
            await axios({
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${this.state.token}`
                },
                url:`${url}users/messages/${this.props.id}`
            })
            .then(res => {
                this.setState({messages: res.data})
                console.log(res.data)
            })
            this.setState({isFetching:false})
        }
        sendData()
    }

    async sendChatButton() {
        const {textInput} = this.state

        const res = await axios({
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${this.state.token}`,
                'content-type':'application/json'
            },
            url:url+'users/message',
            data: {
                message: textInput,
                room: this.props.id
            }
        })
        .then(res=>{console.log(res.data)})

        this.fetchMessages()

        this.setState({textInput:''})
    }



    render() {
        return (
            <View style={styles.container} >
                <View style={styles.chatContainer} >
                <FlatList
                    inverted
                    // onRefresh={() => this.onRefresh()}
                    // refreshing={this.state.isFetching}
                    data={this.state.messages}
                    renderItem={({item}) => (
                        <View style={[this.state.id_user === item.user_id ? styles.chatBoxUser : styles.chatBox]}>
                            <View style={[this.state.id_user === item.user_id ? styles.chatBox1User : styles.chatBox1]}>
                                <Thumbnail
                                    small
                                    source={{uri:item.user.image_profil}}
                                />
                            </View>
                            <TouchableOpacity
                                onLongPress={
                                    () => {this.state.id_user === item.user_id ?  this.modalChat(item.id):null}
                                }
                                style={[this.state.id_user === item.user_id ? styles.chatBox2User : styles.chatBox2]}
                            >
                                <Text style={this.state.id_user === item.user_id ? styles.chatTextUser:styles.chatText}>
                                    {this.state.id_user === item.user_id ? 'Me':item.user.username}
                                </Text>
                                <Text style={this.state.id_user === item.user_id ? styles.chatText2User:styles.chatText2} >
                                    {item.message}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item)=> { return item.id.toString()}}
                />
            </View>
            <View style={styles.footer}>
                <View style={styles.footerBox}>
                    <TextInput
                        style={styles.textInputBottomValue}
                        onChangeText={(textInput)=> {this.setState({textInput})}}
                        value={this.state.textInput}
                        multiline={true}
                        
                        placeholder='Write Something..'
                    />
                    <TouchableOpacity
                        style={styles.buttonBottom}
                        onPress={()=> this.handlePress()}    
                    >
                        <Icon name='send' style={styles.buttonSendIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        margin:0,
    },
    headerHome: {
        backgroundColor: '#7FC7DA',
        elevation:5,
        borderBottomColor:'#BBBBBB',
        borderBottomWidth:0.7,
    },
    headerText: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    iconBoxHome: {
        padding:5,
        alignItems:'center',
        justifyContent:'center',
        color:'#FFF',
    },
    textHeader2 : {
        justifyContent: 'center',
        color: '#FFF',
        fontSize: 22,
        fontWeight: '500',
        padding:2,
        paddingLeft:10,
    },
    footer: {
        paddingVertical:6,
        backgroundColor:'transparent',
        height:70,
        paddingHorizontal:6,
    },
    footerBox: {
        flexDirection:'row',
        backgroundColor:'transparent',
        paddingLeft:5,
        paddingRight:5,
        marginHorizontal:1,
        borderWidth:1,
        height:60,
        borderColor:'#A9A9A9',
        borderRadius:30,
    },
    textInputBottomValue: {
        fontSize:17,
        width:330,
        paddingHorizontal:10,
        paddingVertical:15,
    },
    buttonBottom: {
        backgroundColor:'#7FC7DA',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        position:'absolute',
        bottom:3,
        right:3,
        height:52,
        width:52,
    },
    headerIcon: {
        color:'white',
        fontSize:30,
    },
    buttonSendIcon: {
        fontSize:20,
        color:'white',
    },
    chatBox: {
        padding:10,
        flexDirection:'row',
    },
    chatBoxUser: {
        padding:10,
        flexDirection:'row-reverse',
    },
    chatBox1: {
        paddingRight:10,
    },
    chatBox1User: {
        paddingLeft:10,
    },
    chatBox2: { 
        top:10,
        paddingTop:5,
        paddingBottom:10,
        paddingRight:20,
        paddingLeft:20,
        maxWidth:330,
        flexDirection:'column',
        backgroundColor:'#E3E5E6',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 20,
    },
    chatBox2User: {
        top:10,
        paddingTop:5,
        paddingBottom:10,
        paddingRight:20,
        paddingLeft:20,
        maxWidth:330,
        flexDirection:'column',
        backgroundColor:'#67CDD2',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 0,
    },
    chatText: {
        color:'#287E93',
        fontWeight:'bold',
        fontSize:16,
        paddingBottom:7,
        paddingTop:2,
    },
    chatTextUser: {
        color:'#FFF',
        fontWeight:'bold',
        fontSize:16,
        paddingBottom:7,
        paddingTop:2,
        textAlign:'right',
    },
    chatText2: {
        fontSize:17,
    },
    chatText2User: {
        fontSize:17,
        textAlign:'right',
    },
    chatContainer: {
        flex:9
    },
    modalContainer: {
        flex:1,
        position:'absolute',
        margin:0,
        bottom:0,
    },
    modalContent: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        width:width,
        padding:10,
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },
    buttonModal: {
        padding:20,
    },
    textModal: {
        fontSize:20,
        color:'blue'
    },
    textModal2: {
        fontSize:20,
        color:'red'
    },
})