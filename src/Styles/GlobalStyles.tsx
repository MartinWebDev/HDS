import React, { Component } from 'react';

import {
    StyleSheet, 
    ViewStyle, 
    TextStyle, 
    ImageStyle
} from 'react-native';

export const HorizontalSliderStyle = StyleSheet.create({
    slider: {
        paddingTop: 5, 
        paddingBottom: 5
    } as ViewStyle
});

export const HotProductThumbStyle = StyleSheet.create({
    container: {
        borderWidth: 1, 
        borderColor: "#CCC", 
        marginLeft: 5, 
        marginRight: 5
    } as ViewStyle, 
    innerWrapper: {
        position: "relative"
    } as ViewStyle, 
    image: {
        width: 100, 
        height: 150
    } as ImageStyle, 
    priceArea: {
        position: "absolute", 
        bottom: 0, 
        right: 0, 
        backgroundColor: "#FF0006", 
        padding: 4
    } as ViewStyle, 
    priceText: {
        color: "#FFF"
    } as TextStyle
});

export const FashionProductThumbStyle = StyleSheet.create({
    container: {
        borderWidth: 1, 
        borderColor: "#CCC", 
        marginLeft: 5, 
        marginRight: 5
    } as ViewStyle, 
    innerWrapper: {

    } as ViewStyle, 
    image: {
        width: 300, 
        height: 150
    } as ImageStyle
});