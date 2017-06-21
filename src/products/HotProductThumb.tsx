// React
import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

// Styles
import { HotProductThumbStyle } from '../Styles/GlobalStyles';

// Interfaces
import { IHotProductThumb } from '../shop/ShopInterfaces';

// Component set up
interface Props {
    productDetails: IHotProductThumb;
    navigation: NavigationScreenProp<any, any>;
}

interface State { }

// Component creation
export class HotProductThumb extends Component<Props, State> {
    render(): JSX.Element {
        let p: IHotProductThumb = this.props.productDetails;

        return (
            <TouchableOpacity style={HotProductThumbStyle.container} onPress={
                () => {
                    this.props.navigation.navigate("Product", { productId: this.props.productDetails.Id })
                }
            }>
                <View style={HotProductThumbStyle.innerWrapper}>
                    <Image source={{ uri: p.ImgUri }} style={HotProductThumbStyle.image} />

                    <View style={HotProductThumbStyle.priceArea}>
                        <Text style={HotProductThumbStyle.priceText}>{p.PriceText}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}