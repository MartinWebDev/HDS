import React, { Component } from 'react';

import {
    View, 
    Text, 
    StyleSheet, 
    ViewStyle, 
    TextStyle
} from 'react-native';

interface Props {
    title: string;
}

interface State { }

export class ScreenSectionTitle extends Component<Props, State> {
    render (): JSX.Element {
        return (
            <View style={homeSectionTitleStyles.container}>
                <View style={homeSectionTitleStyles.headerLines}><Text>-</Text></View>

                <View>
                    <Text style={homeSectionTitleStyles.textView}>{this.props.title}</Text>
                </View>

                <View style={homeSectionTitleStyles.headerLines}><Text>-</Text></View>
            </View>
        );
    }
}

const homeSectionTitleStyles = StyleSheet.create({
    headerLines: { 
        backgroundColor: "#666", 
        height: 2, 
        width: 24, 
        margin: 10 
    } as ViewStyle, 
    container: {
        flex: 1, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center", 
        marginBottom: 12
    } as ViewStyle, 
    textView: {
        fontSize: 22
    } as TextStyle
});
