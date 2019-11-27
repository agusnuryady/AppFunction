import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, FlatList, TextInput, TouchableOpacity } from 'react-native'
import {Icon} from 'native-base'
import axios from 'axios'
import {connect} from 'react-redux'

import connection from './socketConnection'
import * as actionChats from '../../../redux/actions/ChatList'

var {width,height}=Dimensions.get('window')
let subscription;

class Chats extends Component {
    
    constructor(props){
        super(props)
        this.state={
            messages: [],
            textInput:'',
            name:''
        }       
    }

    componentDidMount() {
        connection.connect();

        // storing the subscription in the global variable
        // passing the incoming data handler fn as a second argument
        subscription = connection.subscribe(`room:${this.props.id}`, this.handleMessageAdd);
    
        // loading existing messages
        this.props.requestChatList(this.props.id)
    }

    componentWillUnmount () {
        subscription.close();
    }
    
    handleMessageAdd = message => {
        const { type, data } = message;
    
        // you could handle various types here, like deleting or editing a message
        switch (type) {
        case 'room:newMessage':
            this.props.addChatList(data)
            break;
        default:
        }
    };
    
    async sendChatButton() {
        const {textInput, name} = this.state

        this.props.sendChat({name: name, message: textInput, id: this.props.id})

        this.setState({textInput:'', name:''})
    }



    render() {
        return (
            <View style={styles.container} >
                <View style={styles.chatContainer} >
                <FlatList
                    inverted
                    // onRefresh={() => this.onRefresh()}
                    // refreshing={this.state.isFetching}
                    data={this.props.ChatList.data}
                    renderItem={({item}) => (
                        <View style={styles.chatBox}>
                            <Text style={styles.chatText}>
                                {item.name}
                            </Text>
                            <Text style={styles.chatText2} >
                                {item.message}
                            </Text>
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
                    <TextInput
                        style={styles.textInputBottomValue}
                        onChangeText={(name)=> {this.setState({name})}}
                        value={this.state.name}
                        multiline={true}
                        
                        placeholder='Write your name..'
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

const mapStateProps = (state) => {
    return {
        ChatList: state.ChatList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchChats: id => dispatch(actionChats.requestChatList(id)),
        addChatList: data => dispatch(actionChats.addChatList(data)),
        sendChat: data => dispatch(actionChats.createChats(data))
    }
}

export default connect(mapStateProps, mapDispatchToProps)(Chats)