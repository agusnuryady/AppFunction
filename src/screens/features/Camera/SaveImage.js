import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import {connect} from 'react-redux'
import {StackActions, NavigationActions} from 'react-navigation'
import * as actionImage from '../../../redux/actions/Images'

class SaveImage extends Component {

    constructor(props){
        super(props)
        this.state={
            uri: '',
            id: '',
            name: '',
            description: '',
        }
    }

    componentWillMount() {
        const {navigation} = this.props
        this.setState({uri:navigation.getParam('uri','')})
    }

    componentDidMount() {
        this.idStat()
    }

    idStat() {
        const data = this.props.ListImage.data
        if (data !== 'undefined' && data.length > 0) {
            const mapId = data.map(value => {
                return value.id
            })
            const maxId = Math.max.apply(null, mapId)+1
            this.setState({id:maxId})
        } else {
            this.setState({id:1})
        }
    }

    async handleSave() {
        await this.props.addImage({id:this.state.id, uri:this.state.uri, name:this.state.name, description:this.state.description})
        await this.props.navigation.dispatch(StackActions.reset({
            index:0,
            actions: [
                NavigationActions.navigate({ routeName: 'ListPicture' })
            ]
        }))
    }

    render() {
        console.log(this.state.uri);
        console.log(this.state.id);
        
        return (
            <View style={{flex:1, margin:0}} >
                <View style={{backgroundColor:'#5F42AB', alignItems:'center', justifyContent:'center', elevation:5}} >
                    <Text style={{fontSize:25, fontWeight:'bold', color:'white', margin:15}} >
                        FORM SAVE IMAGE
                    </Text>
                </View>
                <View style={{alignItems:'center',paddingTop:10, paddingHorizontal:20}} >
                    <Image
                        source={{uri:this.state.uri}}
                        style={{width:150, height:150, marginVertical:30}}
                    />
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
                        style={{backgroundColor:'#5F42AB', elevation:5,marginVertical:40, padding:10, borderRadius:30, alignItems:'center', justifyContent:'center'}}
                        onPress={() => this.handleSave()}
                    >
                        <Text style={{fontSize:22, color:'white', marginHorizontal:30}} >
                            SAVE
                        </Text>
                    </TouchableOpacity>
                </View>
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
        addImage: data => dispatch(actionImage.addImage(data))
    }
}

export default connect(mapStateProps, mapDispatchToProps)(SaveImage)