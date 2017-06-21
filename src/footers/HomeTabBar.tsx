import React, { Component } from 'react';

import {
    Text, 
    View, 
    Image, 
    ViewStyle, 
    TextStyle
} from 'react-native';

import {
    
} from 'react-navigation';

interface Props { }
interface State { }

export class HomeTabBar extends Component<Props, State> {
    render (): JSX.Element {
        return (
            <View>
                <Text>Hello Tab Bar</Text>
            </View>
        );
    }
}