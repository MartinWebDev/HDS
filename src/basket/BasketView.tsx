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

import { NavigationScreenProp } from 'react-navigation';

// Global Components
import { ScreenView } from '../GlobalComponents/ScreenView';

// Child Components
import { BasketVendor } from './BasketView/BasketVendor';

// Data
import { IShoppingCartVendor, IShoppingCartItem } from '../Services/ClientData/ShoppingCart';

interface ISelected {
    vendorId: number;
    selectedItemIds: number[];
}

interface IProps {
    navigation: NavigationScreenProp<any, any>;
    cart: IShoppingCartVendor[];
    updateQuantity: (vendorId: number, cartItemId: number, qty: number) => void;
}

interface IState {
    selected: ISelected[];
}

export class BasketView extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = { selected: [] };

        // All selected version of state - For TESTing
        this.state = {
            selected: [
                { vendorId: 1, selectedItemIds: [253, 254, 265, 266] },
                { vendorId: 2, selectedItemIds: [306, 308, 309, 314] }
            ]
        };

        // Not all selected version of state - For TESTing
        this.state = {
            selected: [
                { vendorId: 1, selectedItemIds: [253, 254, 265, 266, 268] },
                { vendorId: 2, selectedItemIds: [306, 308, 309, 314] }
            ]
        };
    }

    handleToggleSelectedId(vendorId: number, cartItemId: number): void {
        //console.warn(`Toggle Select. Vendor: ${vendorId} - Cart Item: ${cartItemId}`);
        // Select some data we need
        let cart = this.props.cart;
        let selected = this.state.selected;

        let vendorIndex = cart.map((c) => { return c.VendorId }).indexOf(vendorId);
        let itemIndex = cart[vendorIndex].CarItems.map((c) => { return c.Id; }).indexOf(cartItemId);

        // Find out if it's already selected.
        let selectedVendorIndex = selected.map((s) => { return s.vendorId; }).indexOf(vendorId);
        let selectedItemIndex = selectedVendorIndex == -1 ?
            -1 :
            selected[selectedVendorIndex].selectedItemIds.indexOf(cartItemId);

        if (selectedItemIndex != -1) {
            // If exists, remove it.
            selected[selectedVendorIndex].selectedItemIds.splice(selectedItemIndex, 1);

            // If last item in vendor list, remove vendor.
            if (selected[selectedVendorIndex].selectedItemIds.length == 0) {
                selected.splice(selectedVendorIndex, 1);
            }
        }
        else {
            // If doesn't exist add it in. Need to add vendor if that doesn't exist too.
            if (selectedVendorIndex == -1) {
                selected.push({ vendorId: vendorId, selectedItemIds: [] as number[] });
                selectedVendorIndex = selected.length - 1; // Update index since it exists now. 
            }

            selected[selectedVendorIndex].selectedItemIds.push(cartItemId);
        }

        // Finally, update state with changes made above
        this.setState({ selected: selected });
    }

    handleRemoveItem(vendorId: number, cartItemId: number): void {
        console.warn(`Remove Item. Vendor: ${vendorId} - Cart Item: ${cartItemId}`);
        // TODO This is the only function on this page that requires an API call to remove the item from the cart
    }

    handleToggleSelectAll(vendorId: number): void {
        //console.warn(`Select All. Vendor: ${vendorId}`);
        // Check if all selected for this group, add or remove items as required
        var selected = this.state.selected;
        let cart = this.props.cart;

        let vendorIndex: number = cart.map((c) => { return c.VendorId; }).indexOf(vendorId);
        let vendorSelected: boolean = this.areAllVendorItemsSelected(vendorIndex);
        let selectedIndex: number = selected.map((s) => { return s.vendorId }).indexOf(vendorId);

        if (vendorSelected) {
            selected.splice(selectedIndex, 1);
        }
        else {
            // Clear it out and refill it
            if (selectedIndex != -1) {
                selected.splice(selectedIndex, 1);
            }

            let newEntry: ISelected = { vendorId: vendorId, selectedItemIds: [] as number[] } as ISelected;

            for (var i = 0; i < cart[vendorIndex].CarItems.length; i++) {
                newEntry.selectedItemIds.push(cart[vendorIndex].CarItems[i].Id);
            }

            selected.push(newEntry);
        }

        this.setState({ selected: selected });
    }

    handleToggleSelectEverything(): void {
        //console.warn("Toggle everything from every vendor");
        // Easiest way to do this is to just empty or fill the whole thing rather than loop and check
        let allSelected: boolean = this.areAllItemsSelected();

        if (allSelected) {
            this.setState({ selected: [] });
        }
        else {
            var selected: ISelected[] = [];
            let cart = this.props.cart;

            for (var i = 0; i < cart.length; i++) {
                let vendorId = cart[i].VendorId;
                let items: number[] = [];

                for (var j = 0; j < cart[i].CarItems.length; j++) {
                    items.push(cart[i].CarItems[j].Id);
                }

                selected.push({
                    vendorId: vendorId,
                    selectedItemIds: items
                });
            }

            this.setState({ selected: selected });
        }
    }

    areAllVendorItemsSelected(vendorIndex: number): boolean {
        var allSelected: boolean = true;
        var selected: ISelected[] = this.state.selected;
        var cart: IShoppingCartVendor[] = this.props.cart;

        let items = cart[vendorIndex].CarItems;

        let indexA = selected.map((s) => { return s.vendorId }).indexOf(cart[vendorIndex].VendorId);

        if (indexA == -1) {
            allSelected = false;
        }
        else {
            for (var j = 0; j < items.length; j++) {
                let indexB = selected[indexA].selectedItemIds.indexOf(items[j].Id);

                if (indexB == -1) {
                    allSelected = false;
                    j = items.length; //Exit loop early
                }
            }
        }

        return allSelected;
    }

    areAllItemsSelected(): boolean {
        var allSelected: boolean = true;
        var selected: ISelected[] = this.state.selected;
        var cart: IShoppingCartVendor[] = this.props.cart;

        if (selected.length == 0) {
            return false;
        }

        // Loop through items in cart and see if any are not selected. 
        // If even 1 is not selected, then exit the loop early to save time. 
        for (var i = 0; i < cart.length; i++) {
            let indexA = selected.map((s) => { return s.vendorId }).indexOf(cart[i].VendorId);

            if (indexA == -1) {
                allSelected = false;
                i = cart.length; // Exit early
            }
            else {
                allSelected = this.areAllVendorItemsSelected(i);

                if (!allSelected) {
                    i = cart.length; // Exit loop early
                }
            }
        }

        return allSelected;
    }

    render(): JSX.Element {
        var allSelected: boolean = true;
        var selected: ISelected[] = this.state.selected;
        var cart: IShoppingCartVendor[] = this.props.cart;

        allSelected = this.areAllItemsSelected();

        let vendors = this.props.cart.map((vendor, index) => {
            // Index of selected for this vendor
            let pos = this.state.selected.map((s) => { return s.vendorId; }).indexOf(vendor.VendorId);

            // Render item
            return (
                <BasketVendor
                    key={index}
                    vendor={vendor}
                    selectedIds={
                        pos != -1 ?
                            this.state.selected[pos].selectedItemIds :
                            []
                    }
                    toggleSelectedId={this.handleToggleSelectedId.bind(this)}
                    updateQuantity={this.props.updateQuantity}
                    removeItem={this.handleRemoveItem.bind(this)}
                    toggleSelectAll={this.handleToggleSelectAll.bind(this)}
                />
            );
        });

        return (
            <View style={styles.container}>
                <View style={styles.itemsContainer}>
                    <ScreenView>
                        {vendors}
                    </ScreenView>
                </View>

                <View style={styles.purchaseBar}>
                    <TouchableOpacity
                        style={styles.checkboxWrapper}
                        onPress={this.handleToggleSelectEverything.bind(this)}
                    >
                        {
                            allSelected ?
                                <Image
                                    source={require("../../Assets/Icons/Basket/CheckChecked.png")}
                                    style={styles.checkbox}
                                /> :
                                <Image
                                    source={require("../../Assets/Icons/Basket/CheckUnchecked.png")}
                                    style={styles.checkbox}
                                />
                        }

                        <Text style={{ fontSize: PixelRatio.getPixelSizeForLayoutSize(6) }}>全选</Text>
                    </TouchableOpacity>

                    {/* Final buttons */}
                    <Text>test</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    } as ViewStyle,
    itemsContainer: {
        flex: 1
    } as ViewStyle,
    purchaseBar: {
        borderTopColor: "#CCC",
        borderTopWidth: 1,
        backgroundColor: "#FFF",
        flexDirection: "row",
        justifyContent: "space-between",
        height: PixelRatio.getPixelSizeForLayoutSize(20)
    } as ViewStyle,
    checkboxWrapper: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingRight: PixelRatio.getPixelSizeForLayoutSize(3)
    } as ViewStyle,
    checkbox: {
        height: PixelRatio.getPixelSizeForLayoutSize(10),
        width: PixelRatio.getPixelSizeForLayoutSize(10),
        marginHorizontal: PixelRatio.getPixelSizeForLayoutSize(3)
    } as ImageStyle
});
