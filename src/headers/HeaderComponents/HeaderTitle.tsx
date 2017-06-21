import React, { Component } from 'react';

import {
    Text,
    StyleSheet,
    TextStyle,
    PixelRatio
} from 'react-native';

import { NavigationParams } from 'react-navigation';

interface Props {
    params: NavigationParams
}

interface State { }

export class HeaderTitle extends Component<Props, State> {
    render(): JSX.Element {
        return (
            <Text style={styles.text}>
                {
                    this.props.params != null ?
                        this.props.params.title :
                        "Loading..."
                }
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(6)
    } as TextStyle
});