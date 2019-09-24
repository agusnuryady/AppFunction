import React, { Component } from 'react'
import { StyleSheet, Text, View, Alert, Image, ActivityIndicator, TouchableOpacity, } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin'
import {LoginButton,LoginManager,AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk'

export default class GoogleLogin extends Component {

    constructor(props){
        super(props)
        this.state={
            isSigninInProgress: false,
            userInfo: null,
            gettingLoginStatus: true,
        }
            
    }

    componentDidMount() {
        GoogleSignin.configure({
            webClientId: '672854553551-a1aq2pa716ae6e95ik0tbbptus7d0dls.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true,
        });
        this._isSignedIn();
    }

    _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            alert('User is already signed in');
            //Get the User details as user is already signed in
            this._getCurrentUserInfo();
        } else {
            //alert("Please Login");
            console.log('Please Login');
        }
        this.setState({ gettingLoginStatus: false });
    };

    _getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            console.log('User Info --> ', userInfo);
            this.setState({ userInfo: userInfo });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                alert('User has not signed in yet');
                console.log('User has not signed in yet');
            } else {
                alert("Something went wrong. Unable to get user's info");
                console.log("Something went wrong. Unable to get user's info");
            }
        }
    };

    _signIn = async () => {
        //Prompts a modal to let the user sign in into your application.
        try {
            await this.setState({ isSigninInProgress: true })
            await GoogleSignin.hasPlayServices({
                //Check if device has Google Play Services installed.
                //Always resolves to true on iOS.
                showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info --> ', userInfo);
            this.setState({ userInfo: userInfo });
            await this.setState({ isSigninInProgress: false })
        } catch (error) {
            console.log('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available or Outdated');
            } else {
                console.log('Some Other Error Happened');
            }
        }
    };

    _signOut = async () => {
        //Remove user session from the device.
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ userInfo: null }); // Remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        console.log(this.state.userInfo);
         //returning Loader untill we check for the already signed in user
    if (this.state.gettingLoginStatus) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
            );
        } else {
            if (this.state.userInfo != null) {
            //Showing the User detail
            return (
                <View style={styles.container}>
                <Image
                    source={{ uri: this.state.userInfo.user.photo }}
                    style={styles.imageStyle}
                />
                <Text style={styles.text}>
                    Name: {this.state.userInfo.user.name}{' '}
                </Text>
                <Text style={styles.text}>
                    Email: {this.state.userInfo.user.email}
                </Text>
                <TouchableOpacity style={styles.button} onPress={this._signOut}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                </View>
            );
            } else {
            //For login showing the Signin button
            return (
                <View style={styles.container}>
                <GoogleSigninButton
                    style={{ width: 230, height: 48, margin:10 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this._signIn}
                    disabled={this.state.isSigninInProgress} 
                />
                <LoginButton
                    style={{ width: 230, height: 32, margin:10, }}
                    publishPermissions={["publish_actions,user_birthday, user_religion_politics, user_relationships, user_relationship_details, user_hometown, user_location, user_likes, user_education_history, user_work_history, user_website, user_managed_groups, user_events, user_photos, user_videos, user_friends, user_about_me, user_status, user_games_activity, user_tagged_places, user_posts, user_actions.video, user_actions.news, user_actions.books, user_actions.music, user_actions.fitness, public_profile, basic_info"]}
                    readPermissions={['public_profile']}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                            alert("login has error: " + result.error);
                            } else if (result.isCancelled) {
                            alert("login is cancelled.");
                            } else {
                    
                            AccessToken.getCurrentAccessToken().then(
                                (data) => {
                                let accessToken = data.accessToken
                                alert(accessToken.toString())
                    
                                const responseInfoCallback = (error, result) => {
                                    if (error) {
                                    console.log(error)
                                    alert('Error fetching data: ' + error.toString());
                                    } else {
                                    this.setState({userInfo:result})
                                    console.log(result)
                                    alert('Success fetching data: ' + result.toString());
                                    }
                                }
                    
                                const infoRequest = new GraphRequest(
                                    '/me',
                                    {
                                    accessToken: accessToken,
                                    parameters: {
                                        fields: {
                                        string: 'email,name,first_name,middle_name,last_name'
                                        }
                                    }
                                    },
                                    responseInfoCallback
                                );
                    
                                // Start the graph request.
                                new GraphRequestManager().addRequest(infoRequest).start()
                    
                                }
                            )
                    
                            }
                        }
                    }
                    onLogoutFinished={() => console.log("logout.")}/>
                </View>
            );
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: 200,
        height: 300,
        resizeMode: 'contain',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 300,
        marginTop: 30,
    },
});