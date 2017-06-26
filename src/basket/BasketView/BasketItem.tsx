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

// Child Components
import { QuantitySelector } from '../../GlobalComponents/QuantitySelector';

// Data
import { IShoppingCartItem } from '../../Services/ClientData/ShoppingCart';

// Services
import { AttributeConversionService } from '../../Services/AttributeConversionService';

interface IState { }

interface IProps {
    item: IShoppingCartItem;
    edit: boolean;

    // Functions - TODO Make sure these are not optional after implemented
    updateQuantity?: (cartItemId: number, qty: number) => void; // TODO Implement function on controller component
    removeItem?: (cartItemId: number) => void; // TODO Implement function on controller component
}

export class BasketItem extends Component<IProps, IState> {
    handleChangeQuantity(qty: number) {
        console.log("TODO: Stuff");
    }

    render(): JSX.Element {
        let item = this.props.item;
        let edit = this.props.edit;

        // Remove HTML from attributes xml
        item.AttributesXml = AttributeConversionService.RemoveHtmlTags(item.AttributesXml);

        return (
            <View style={styles.container}>
                <Image source={{ uri: item.ImgUrl }} style={styles.thumb} />

                {
                    !edit ?
                        // Normal mode
                        <View style={styles.itemDetails}>
                            <Text>{item.ProductName}</Text>
                            <Text>{item.AttributesXml}</Text>

                            <View style={styles.priceQuantity}>
                                <View style={styles.price}>
                                    <Text>{item.Amount}</Text>
                                </View>

                                <View style={styles.quantity}>
                                    <Text>x {item.Quantity}</Text>
                                </View>
                            </View>
                        </View> :
                        // Edit mode
                        <View>
                            <QuantitySelector
                                quantity={item.Quantity}
                                quantityChange={this.handleChangeQuantity.bind(this)}
                                size="large"
                            />
                        </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: PixelRatio.getPixelSizeForLayoutSize(4),
        borderTopColor: "#CCC",
        borderTopWidth: 1
    } as ViewStyle,
    thumb: {
        height: PixelRatio.getPixelSizeForLayoutSize(30),
        width: PixelRatio.getPixelSizeForLayoutSize(30),
        marginRight: PixelRatio.getPixelSizeForLayoutSize(4)
    } as ImageStyle,
    itemDetails: {
        flex: 1,
        justifyContent: "space-between"
    } as ViewStyle,
    priceQuantity: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    } as ViewStyle,
    price: {
        flex: 1
    } as ViewStyle,
    quantity: {
        flex: 1,
        alignItems: "flex-end"
    } as ViewStyle
});
