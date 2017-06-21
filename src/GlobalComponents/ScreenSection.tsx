import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    ViewStyle
} from 'react-native';

interface Props {
    style?: any;
    fullWidth: boolean;
    upperMargin?: boolean;
    noBorder?: boolean;
}

interface State { }

export class ScreenSection extends Component<Props, State> {
    render(): JSX.Element {
        let marginTop: boolean = this.props.upperMargin == null ? true : this.props.upperMargin;
        let marginTopValue: number = marginTop ? 8 : 0;
        let noBorder: boolean = this.props.noBorder == null ? false : this.props.noBorder;
        let borderValue: number = noBorder ? 0 : 1;

        let extraStyle = StyleSheet.create({
            container: {
                marginHorizontal: this.props.fullWidth ? 0 : 8,
                marginTop: marginTopValue,
                borderWidth: borderValue
            } as ViewStyle
        });

        return (
            <View style={[screenSectionStyles.container, extraStyle.container, { ...this.props.style }]}>
                {this.props.children}
            </View>
        );
    }
}

const screenSectionStyles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        marginBottom: 0,
        borderColor: "#DDD",
        padding: 12
    } as ViewStyle
});
