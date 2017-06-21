import React, { Component } from 'react';

import {
    View, 
    ScrollView, 
    ViewStyle
} from 'react-native';

import { HorizontalSliderStyle } from '../Styles/GlobalStyles';

interface Props { 
    style: ViewStyle
}

interface State { }

export class HorizontalSlider extends Component<Props, State> {
    render (): JSX.Element {
        return (
            <ScrollView horizontal={true} style={[HorizontalSliderStyle.slider, this.props.style]}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    {this.props.children}
                </View>
            </ScrollView>
        );
    }
}