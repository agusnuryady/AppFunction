import React, { Component } from 'react'
import { View, Text, StyleSheet, Picker, AppState, Platform, TouchableOpacity } from 'react-native'
import PushNotification from 'react-native-push-notification'
import PushController from './PushController'

export default class Notification extends Component {
    
    constructor(props) {
        super(props)

        this.handleAppStateChange = this.handleAppStateChange.bind(this)

        this.state = {
            seconds: 5,
        }
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }
    
    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }
    
    handleAppStateChange(appState) {
        if (appState === 'background') {
        let date = new Date(Date.now() + (this.state.seconds * 1000));
    
        if (Platform.OS === 'ios') {
            date = date.toISOString();
        }
    
        PushNotification.localNotificationSchedule({
            message: "My Notification Message",
            date,
            playSound: true, // (optional) default: true
            soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        });
        }
    }

    handlePushNotification(){
        let date = new Date(Date.now() + (this.state.seconds * 1000));

        PushNotification.localNotification({
            message: "My Notification Message", // (required)
            date,
            soundName:'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        });
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Choose your notification time in seconds.
                </Text>
                <Picker
                    style={styles.picker}
                    selectedValue={this.state.seconds}
                    onValueChange={(seconds) => this.setState({ seconds })}
                >
                    <Picker.Item label="5" value={5} />
                    <Picker.Item label="10" value={10} />
                    <Picker.Item label="15" value={15} />
                </Picker>
                <PushController/>

                <TouchableOpacity
                    onPress={()=> this.handlePushNotification()}
                    style={{padding:10,backgroundColor:'gray'}}
                >
                    <Text style={{color:'white'}} >
                        Push Notification
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    picker: {
        width: 100,
    },
})