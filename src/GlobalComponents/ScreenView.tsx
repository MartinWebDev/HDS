// Import all modules needed from react and react libraries
import React, { Component } from 'react';

import {
    StyleSheet,
    View, 
    ScrollView, 
    ViewStyle
} from 'react-native';

interface Props {
    style?: ViewStyle;
}

interface State { }

export class ScreenView extends Component<Props, State> {
    render (): JSX.Element {
        return (
            <ScrollView style={[screenViewStyles.container, this.props.style]}>
                <View style={screenViewStyles.innerView}>
                    {this.props.children}
                </View>
            </ScrollView>
        );
    }
}

const screenViewStyles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#EEEEEE", 
        paddingBottom: 8
    } as ViewStyle, 
    innerView: {
        flex: 1, 
        marginBottom: 8
    } as ViewStyle
});