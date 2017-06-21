import React, { Component } from 'react';

import {
    View, 
    Text, 
    ViewStyle, 
    TextStyle, 
    StyleSheet
} from 'react-native';

interface Props { }

interface State { }

export class AddTabHeader extends Component<Props, State> {
    render (): JSX.Element {
        return (
            <View>
                <Text>Hello world! This is my header!</Text>
            </View>
        );
    }
}
