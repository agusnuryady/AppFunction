import React, {Component} from 'react'
import {BackHandler} from 'react-native'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'
import {Nav} from '../../App'

class ReduxNavigation extends Component {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }
    
    onBackPress = () => {
        const { router, dispatch } = this.props;
        if (router.index === 0) {
        return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };
    
    render() {
        const { router, dispatch } = this.props;
    
        return <Nav state={router} dispatch={dispatch} />;
    }
}

const mapStateToProps = state => ({
    router: state.router
})

export default connect(mapStateToProps)(ReduxNavigation)