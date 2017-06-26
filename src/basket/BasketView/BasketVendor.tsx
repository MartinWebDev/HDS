import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ViewStyle,
    TextStyle,
    TouchableOpacity,
    PixelRatio
} from 'react-native';

// Global Components
import { ScreenSection } from '../../GlobalComponents/ScreenSection';

// Child Component
import { BasketItem } from './BasketItem';

// Data
import { IShoppingCartVendor, IShoppingCartItem } from '../../Services/ClientData/ShoppingCart';

//编辑
interface IProps {
    vendor: IShoppingCartVendor;
}

interface IState {
    editMode: boolean
}

export class BasketVendor extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            editMode: false
        };
    }

    render(): JSX.Element {
        let v = this.props.vendor;

        let items = v.CarItems.map((item, index) => {
            return (
                <BasketItem key={index} item={item} edit={this.state.editMode} />
            );
        });

        return (
            <ScreenSection fullWidth={false}>
                <View style={styles.container}>
                    <View style={styles.vendorHeader}>
                        <Text>{v.VendorName}</Text>

                        <TouchableOpacity onPress={
                            () => {
                                this.setState({ editMode: !this.state.editMode });
                            }
                        }>
                            <Text>{this.state.editMode ? "Save" : "Edit"}</Text>
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
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(4)
    } as ViewStyle
});
