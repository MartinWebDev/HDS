import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    ViewStyle,
    TextStyle,
    ImageStyle,
    PixelRatio
} from 'react-native';

interface State { }

interface Props { }

export class BasketEmpty extends Component<Props, State> {
    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={require("../../Assets/Icons/Basket/BasketEmpty.png")} />
                <Text style={styles.text}>购物车还空着的,</Text>
                <Text style={styles.text}>去挑几件中意的商品吧！</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    } as ViewStyle,
    image: {
        width: 300, // Seems a good number. It just works. 
        height: 83,
        marginBottom: 20
    } as ImageStyle,
    text: {
        color: "#999",
        fontSize: PixelRatio.getPixelSizeForLayoutSize(8)
    } as TextStyle
});