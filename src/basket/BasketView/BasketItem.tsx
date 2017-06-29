import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    ViewStyle,
    TextStyle,
    ImageStyle,
    PixelRatio,
    TouchableOpacity
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
    selected: boolean;

    // Functions - TODO Make sure these are not optional after implemented
    updateQuantity: (cartItemId: number, qty: number) => void; // TODO Implement function on controller component
    removeItem: (cartItemId: number) => void; // TODO Implement function on controller component
    toggleSelected: (cartItemId: number) => void; // TODO Implement function on controller component
}

export class BasketItem extends Component<IProps, IState> {
    handleChangeQuantity(qty: number) {
        this.props.updateQuantity(this.props.item.Id, qty);
    }

    render(): JSX.Element {
        let item = this.props.item;
        let edit = this.props.edit;
        let selected = this.props.selected;

        // Remove HTML from attributes xml
        item.AttributesXml = AttributeConversionService.RemoveHtmlTags(item.AttributesXml);

        return (
            <View style={styles.container}>
                <View style={styles.checkboxWrapper}>
                    <TouchableOpacity onPress={
                        () => {
                            this.props.toggleSelected(item.Id);
                        }
                    }>
                        {
                            selected ?
                                <Image
                                    source={require("../../../Assets/Icons/Basket/CheckChecked.png")}
                                    style={styles.checkbox}
                                /> :
                                <Image
                                    source={require("../../../Assets/Icons/Basket/CheckUnchecked.png")}
                                    style={styles.checkbox}
                                />
                        }
                    </TouchableOpacity>
                </View>

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
                        <View style={styles.quantityDelete}>
                            <QuantitySelector
                                quantity={item.Quantity}
                                quantityChange={this.handleChangeQuantity.bind(this)}
                                size="small"
                            >
                                {/* Insert extras into the quantity box. This assists with alignment */}
                                <TouchableOpacity style={styles.deleteButton} onPress={
                                    () => {
                                        this.props.removeItem(item.Id);
                                    }
                                }>
                                    <Text style={styles.deleteText}>删除</Text>
                                </TouchableOpacity>
                            </QuantitySelector>
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
        height: PixelRatio.getPixelSizeForLayoutSize(25),
        width: PixelRatio.getPixelSizeForLayoutSize(25),
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(6)
    } as ImageStyle,
    checkboxWrapper: {
        justifyContent: "center"
    } as ViewStyle,
    checkbox: {
        height: PixelRatio.getPixelSizeForLayoutSize(8),
        width: PixelRatio.getPixelSizeForLayoutSize(8),
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
    } as ViewStyle,
    quantityDelete: {
        flexDirection: "row"
    } as ViewStyle,
    deleteButton: {
        backgroundColor: "#ff0006",
        marginLeft: PixelRatio.getPixelSizeForLayoutSize(3),
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(3)
    } as ViewStyle,
    deleteText: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(6),
        color: "#FFF"
    } as TextStyle
});
