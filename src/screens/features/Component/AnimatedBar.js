import React, { Component } from 'react'
import { Text, View, Animated } from 'react-native'

export default class AnimatedBar extends Component {
    
    constructor(props) {
        super(props);
    
        this._width = new Animated.Value(0);
        this.state = {
            color: 'red',
        };
    }
    
    componentDidMount() {
        this.animateTo(this.props.delay, this.props.value);
    }

    componentWillReceiveProps(nextProps) {
        this.animateTo(nextProps.delay, nextProps.value);
    }

    animateTo = (delay, value) => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.timing(this._width, {
            toValue: value * 20,
            }),
        ]).start();
    }

    render() {
        const barStyles = {
            backgroundColor: this.state.color,
            height: 20,
            width: this._width,
        };

        return (
            <Animated.View style={barStyles} />
        );
    }    
}
