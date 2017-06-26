import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    TouchableOpacity,
    PixelRatio
} from 'react-native';

interface IProps {
    quantity: number;
    size?: "small" | "medium" | "large";
    customSizeModifier?: number;
    quantityChange: (qty: number) => void;
}

interface IState { }

export class QuantitySelector extends Component<IProps, IState> {
    render(): JSX.Element {
        var sizeMultiplier: number = 1;

        if (this.props.customSizeModifier != null && typeof this.props.customSizeModifier != "undefined") {
            sizeMultiplier = this.props.customSizeModifier;
        }
        else {
            switch (this.props.size) {
                case "small":
                    sizeMultiplier = 1;
                    break;
                case "medium":
                    sizeMultiplier = 1.2;
                    break;
                case "large":
                    sizeMultiplier = 1.4;
                    break;
            }
        }

        let sizeStyles = StyleSheet.create({
            down: {
                width: PixelRatio.getPixelSizeForLayoutSize(12 * sizeMultiplier)
            } as ViewStyle,
            quantity: {
                width: PixelRatio.getPixelSizeForLayoutSize(20 * sizeMultiplier)
            } as ViewStyle,
            up: {
                width: PixelRatio.getPixelSizeForLayoutSize(12 * sizeMultiplier)
            } as ViewStyle,
            downText: {
                fontSize: PixelRatio.getPixelSizeForLayoutSize(8 * sizeMultiplier)
            } as TextStyle,
            quantityText: {
                fontSize: PixelRatio.getPixelSizeForLayoutSize(8 * sizeMultiplier)
            } as TextStyle,
            upText: {
                fontSize: PixelRatio.getPixelSizeForLayoutSize(8 * sizeMultiplier)
            } as TextStyle
        });

        return (
            <View key="QuantitySelector">
                <Text>数量</Text>

                <View style={quantityStyles.container}>
                    <TouchableOpacity style={[quantityStyles.down, sizeStyles.down]} onPress={
                        () => {
                            if (this.props.quantity > 1) {
                                this.props.quantityChange(-1);
                            }
                        }
                    }>
                        <Text style={[quantityStyles.downText, sizeStyles.downText]}>-</Text>
                    </TouchableOpacity>

                    <View style={[quantityStyles.quantity, sizeStyles.quantity]}>
                        <Text style={[quantityStyles.quantityText, sizeStyles.quantityText]}>{this.props.quantity}</Text>
                    </View>

                    <TouchableOpacity style={[quantityStyles.up, sizeStyles.up]} onPress={
                        () => {
                            this.props.quantityChange(1);
                        }
                    }>
                        <Text style={[quantityStyles.upText, sizeStyles.upText]}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const quantityStyles = StyleSheet.create({
    container: {
        flexDirection: "row"
    } as ViewStyle,
    down: {
        borderWidth: 1,
        borderColor: "#CCC"
    } as ViewStyle,
    quantity: {
        borderTopWidth: 1,
        borderTopColor: "#CCC",
        borderBottomWidth: 1,
        borderBottomColor: "#CCC"
    } as ViewStyle,
    up: {
        borderWidth: 1,
        borderColor: "#CCC"
    } as ViewStyle,
    downText: {
        color: "#ff0006",
        textAlign: "center"
    } as TextStyle,
    quantityText: {
        textAlign: "center"
    } as TextStyle,
    upText: {
        color: "#ff0006",
        textAlign: "center"
    } as TextStyle
});
