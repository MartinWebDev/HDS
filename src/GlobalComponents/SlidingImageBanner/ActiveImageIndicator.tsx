import React, { Component } from 'react';

import {
    View,
    Text,
    PixelRatio,
    StyleSheet,
    ViewStyle,
    TextStyle
} from 'react-native';

interface IProps {
    childStyle: ViewStyle;
    count: number;
    activeIndex: number;
}

interface IState { }

class IndicatorIcon extends Component<{ active: boolean }, any> {
    render(): JSX.Element {
        let activeColor: string = "#999";
        let inactiveColor: string = "#CCC";
        let iconStyle = { backgroundColor: this.props.active ? activeColor : inactiveColor } as ViewStyle;
        let textStyle = { color: this.props.active ? activeColor : inactiveColor } as TextStyle;

        return (
            <View style={[iconStyle, {
                height: PixelRatio.getPixelSizeForLayoutSize(4),
                width: PixelRatio.getPixelSizeForLayoutSize(4),
                borderRadius: PixelRatio.getPixelSizeForLayoutSize(2),
                margin: PixelRatio.getPixelSizeForLayoutSize(2)
            } as ViewStyle]}>
                <Text style={textStyle}>.</Text>
            </View>
        );
    }
}

export class ActiveImageIndicator extends Component<IProps, IState> {
    render(): JSX.Element {
        var indicators: JSX.Element[] = [];

        if (this.props.count > 1) {
            for (var i = 0; i < this.props.count; i++) {
                indicators.push(<IndicatorIcon key={i.toString()} active={this.props.activeIndex == i} />);
            }
        }

        return (
            <View style={[styles.container, this.props.childStyle]}>
                {indicators}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    } as ViewStyle
});