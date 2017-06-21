import React, { Component } from 'react';

import {
    View, 
    Text, 
    StyleSheet, 
    ViewStyle, 
    TextStyle
} from 'react-native';

interface Props {
    visible: boolean;
    message: string;
}

interface State { }

export class InlineErrorMessage extends Component<Props, State> {
    render (): JSX.Element {
        return (
            <View style={ this.props.visible ? inlineErrorMessage.containerShown : inlineErrorMessage.containerHidden }>
                <Text style={inlineErrorMessage.text}>{this.props.message}</Text>
            </View>
        );
    }
}

const inlineErrorMessage = StyleSheet.create({
    containerShown: {
        padding: 5, 
        borderWidth: 1, 
        borderColor: "#CC8787", 
        backgroundColor: "#FFBABA", 
        alignItems: "center", 
        justifyContent: "center", 
        height: 30
    } as ViewStyle, 
    containerHidden: {
        height: 0
    } as ViewStyle, 
    text: {
        color: "#D8000C"
    } as TextStyle
});