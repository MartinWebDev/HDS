import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

// Global Components
import { ScreenView } from '../GlobalComponents/ScreenView';

// Child Components
import { BasketVendor } from './BasketView/BasketVendor';

// Data
import { IShoppingCartVendor, IShoppingCartItem } from '../Services/ClientData/ShoppingCart';

interface State { }

interface Props {
    navigation: NavigationScreenProp<any, any>;
    cart: IShoppingCartVendor[];
}

export class BasketView extends Component<Props, State> {
    render(): JSX.Element {
        let vendors = this.props.cart.map((vendor, index) => {
            return (
                <BasketVendor key={index} vendor={vendor} />
            );
        });

        return (
            <ScreenView>
                {vendors}
            </ScreenView>
        );
    }
}
