import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    ViewStyle,
    TextStyle,
    ImageStyle,
    TouchableOpacity,
    PixelRatio
} from 'react-native';

// Global Components
import { ScreenSection } from '../../GlobalComponents/ScreenSection';

// Child Component
import { BasketItem } from './BasketItem';

// Data
import { IShoppingCartVendor, IShoppingCartItem } from '../../Services/ClientData/ShoppingCart';

interface IProps {
    vendor: IShoppingCartVendor;
    selectedIds: number[];

    // Functions
    toggleSelectedId: (vendorId: number, itemIds: number) => void;
    updateQuantity: (vendorId: number, itemId: number, qty: number) => void;
    removeItem: (vendorId: number, itemId: number) => void;
    toggleSelectAll: (vendorId: number) => void;
}

interface IState {
    editMode: boolean;
}

export class BasketVendor extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            editMode: false
        };
    }

    handleUpdateQuantity(cartItemId: number, qty: number): void {
        this.props.updateQuantity(this.props.vendor.VendorId, cartItemId, qty);
    }

    handleRemoveItem(cartItemId: number): void {
        this.props.removeItem(this.props.vendor.VendorId, cartItemId);
    }

    handleToggleSelected(cartItemId: number): void {
        this.props.toggleSelectedId(this.props.vendor.VendorId, cartItemId);
    }

    handleToggleSelectAll(): void {
        this.props.toggleSelectAll(this.props.vendor.VendorId);
    }

    render(): JSX.Element {
        let v = this.props.vendor;
        var allSelected: boolean = true;

        let items = v.CarItems.map((item, index) => {
            let selected = this.props.selectedIds.indexOf(item.Id) != -1;

            allSelected = !selected ? false : allSelected;

            return (
                <BasketItem
                    key={index}
                    item={item}
                    edit={this.state.editMode}
                    selected={selected}
                    removeItem={this.handleRemoveItem.bind(this)}
                    toggleSelected={this.handleToggleSelected.bind(this)}
                    updateQuantity={this.handleUpdateQuantity.bind(this)}
                />
            );
        });

        return (
            <ScreenSection fullWidth={false}>
                <View style={styles.container}>
                    <View style={styles.vendorHeader}>
                        <View style={styles.checkboxWrapper}>
                            <TouchableOpacity onPress={
                                () => {
                                    this.handleToggleSelectAll();
                                }
                            }>
                                {
                                    allSelected ?
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

                        <Text>{v.VendorName}</Text>

                        <TouchableOpacity onPress={
                            () => {
                                this.setState({ editMode: !this.state.editMode });
                            }
                        }>
                            <Text>{this.state.editMode ? "完成" : "编辑"}</Text>
                        </TouchableOpacity>
                    </View>

                    {items}
                </View>
            </ScreenSection>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    } as ViewStyle,
    vendorHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(3)
    } as ViewStyle,
    checkboxWrapper: {
        justifyContent: "center"
    } as ViewStyle,
    checkbox: {
        height: PixelRatio.getPixelSizeForLayoutSize(8),
        width: PixelRatio.getPixelSizeForLayoutSize(8),
    } as ImageStyle
});
