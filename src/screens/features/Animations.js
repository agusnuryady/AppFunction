import React, { Component } from 'react'
import { Text, View, TouchableWithoutFeedback, TouchableOpacity, FlatList, Animated, Easing, StyleSheet, Dimensions } from 'react-native'
import {Icon} from 'native-base'
import SwipeUpDown from 'react-native-swipe-up-down'
import {Transition, FluidNavigator} from 'react-navigation-fluid-transitions'
import AnimatedBar from './Component/AnimatedBar'

var { width, height } = Dimensions.get('window');
var available_width = width - 40 - 12;
let negativeHeight = -height + 20;
const DELAY = 150;

export default class Animations extends Component {

    constructor(props){
        super(props)
        this.scaleValue = new Animated.Value(0)
        this.yTranslate = new Animated.Value(0)
        this.y_translate = new Animated.Value(0)
        this.width = new Animated.Value(0)
        this.delayValue = 500;
        this.state = {
            isModalVisible:false,
            menu_expanded: false,
            animatedValue: new Animated.Value(0),
            data:[
                    {item:1},
                    {item:2},
                    {item:3},
                    {item:4},
                    {item:5},
                    {item:6},
                    {item:7},
                    {item:8},
                ],
            
        };
    }

    componentWillMount() {
        
    }

    componentDidMount() {
        
    }

    componentDidUpdate() {
        if (this.state.isModalVisible) {
            // animate the showing of the modal
            this.yTranslate.setValue(0); // reset the animated value
            Animated.spring(this.yTranslate, {
                toValue: 1,
                friction: 6,
                useNativeDriver: true, 
            }).start();
            Animated.spring(this.state.animatedValue, {
                toValue: 1,
                tension:20,
                useNativeDriver: true
            }).start();
        } else {
            // animate the hiding of the modal
            Animated.timing(this.yTranslate, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.linear,
            }).start();
        }
        this.animateBar();
    }
    
    scale = ()=> {
        this.setState({isModalVisible:true})
        this.scaleValue.setValue(0)
        Animated.timing(
            this.scaleValue,
            {
                toValue: 1,
                duration: 300,
                easing: Easing.linear,
                useNativeDriver: true,
            }
        ).start();
    }
    
    openMenu() {
        this.setState({
            menu_expanded: true
        }, () => {
            this.y_translate.setValue(0);
            Animated.spring(
            this.y_translate,
            {
                toValue: 1,
                friction: 3
            }
            ).start();
        });
    }
    
    hideMenu() {
        this.setState({
            menu_expanded: false
        }, () => {
            this.y_translate.setValue(1);
            Animated.spring(
            this.y_translate,
            {
                toValue: 0,
                friction: 4
            }
            ).start();
        });
    }

    animateBar = () => {
        this.width.setValue(0); // initialize the animated value
        this.state.data.map((value, index) => {
            Animated.timing(this.width, {
                toValue: value.item,
                delay: index * 150 // how long to wait before actually starting the animation
            }).start();
        })
    };

    render() {
        

        const buttonScale = this.scaleValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1.05, 1]
        });

        let transformStyle = { ...styles.button, transform: [{ scale: buttonScale }] }
        
        let modalMoveY = this.yTranslate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, negativeHeight]
        });

        let translateStyle = { transform: [{ translateY: modalMoveY }] }

        const menu_moveY = this.y_translate.interpolate({
            inputRange: [0, 1],
            outputRange: [0, +300]
        })

        this.delayValue = this.delayValue + 500;
        let translateX = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [this.delayValue, 1]
        });

        let barWidth = {
            width: this.width
        };

        return (
            <View style={styles.container} >
                <Transition shared="circle">
                    <TouchableWithoutFeedback onPress={()=> this.scale()}>
                        <Animated.View style={transformStyle}>
                            <Text style={{color:'white', fontSize:18}} >Scale Button</Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Transition>
                {this.state.isModalVisible?
                    <Animated.View style={[styles.container2, translateStyle]}>
                        <View>
                            <TouchableOpacity 
                                style={{width:width, height:50, marginTop:50, backgroundColor:'#EDEDED', alignItems:'center',justifyContent:'center'}}
                                onPress={()=> this.setState({isModalVisible: false})}>
                            <Text style={{fontSize:20}} >Close</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{backgroundColor:'#F7F7F7', width:width, alignItems:'stretch', flex:1, flexDirection:'column', alignSelf:'stretch'}} >
                            <FlatList
                                keyExtractor={(item) => item.item.toString()}
                                data={this.state.data}
                                renderItem={({item}) => (
                                    <Animated.View style={[styles.listItem, { transform: [{ translateX: translateX }] }]} >
                                        <View style={{backgroundColor:'#49BD78', width:80, height:80, borderRadius:10, margin:10}} />
                                        <Text style={{marginLeft:40, fontSize:20}} >
                                            This is content item {item.item}
                                        </Text>
                                    </Animated.View>
                                )}
                            />
                        </View>
                    </Animated.View> : null
                }
                <Transition shared="circle">
                    <Animated.View style={[styles.header_menu, {transform: [{translateY: menu_moveY}]}]}>
                        {
                            !this.state.menu_expanded &&
                            <View style={styles.tip_menu}>
                                <TouchableOpacity onPress={this.openMenu.bind(this)} style={{width:width, alignItems:'center'}}>
                                    <Icon name="dots-three-horizontal" type='Entypo' size={50} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        }
                        {this.state.menu_expanded?
                            <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center'}} >
                                <TouchableOpacity onPress={this.hideMenu.bind(this)} style={styles.button}>
                                    <Text style={{fontSize:18}} >
                                        Close
                                    </Text>
                                </TouchableOpacity>
                            </View> : null
                        }
                    </Animated.View>
                </Transition>
                <SwipeUpDown		
                    itemMini={
                        <View>
                            <Icon name='dots-three-horizontal' type='Entypo'/>
                        </View>
                    } // Pass props component when collapsed
                    itemFull={
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(item, index) => item.item.toString()}
                            renderItem={({item, index}) => (
                                <View style={[styles.listItem, {width:300}]} >
                                    <Text style={{margin:10, fontSize:20}} >
                                        {item.item}
                                    </Text>
                                    <AnimatedBar value={item.item} delay={DELAY * index} key={index} />
                                </View>
                            )}
                        />
                    } // Pass props component when show full}
                    animation='easeInEaseOut'
                    swipeHeight={100}
                    style={{ backgroundColor: '#E6E6E6', alignItems:'center'}} // style for swipe
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    progress_container: {
        borderWidth: 6,
        borderColor: '#333',
        backgroundColor: '#ccc'
    },
    progress_status: {
        color: '#333',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    default_button: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor:'#38E550',
        borderWidth: 1,
        borderColor: '#eee',
        margin: 20,
    },
    container2: {
        position: "absolute",
        height: height,
        width: width,
        flexDirection:'column',
        bottom: -height, // look here
        backgroundColor: "#fff"
    },
    header_menu: {
        position: 'absolute',
        width: width,
        height: 350, 
        top: -300, 
        backgroundColor: '#1fa67a',
        alignItems: 'center',
        padding:15,
        flexDirection:'column-reverse'
    },
    tip_menu: {
        flexDirection: 'row'
    },
    listItem: {
        height:100, backgroundColor:'white', margin:5, borderRadius:10, flexDirection:'row', alignItems:'center'
    },
    bar: {
        height:40,
        backgroundColor:'red'
    }
});