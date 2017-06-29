import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

// Child Components
import { BasketView } from './BasketView';
import { BasketEmpty } from './BasketEmpty';

// Data
import { IShoppingCartVendor, IShoppingCartItem } from '../Services/ClientData/ShoppingCart';

interface IProps {
    navigation: NavigationScreenProp<any, any>;
    cart: IShoppingCartVendor[];
    updateQuantity: (vendorId: number, cartItemId: number, qty: number) => void;
}

interface IState { }

export class BasketDetails extends Component<IProps, IState> {
    render(): JSX.Element {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.props.cart.length > 0 ?
                        <BasketView
                            navigation={this.props.navigation}
                            cart={this.props.cart}
                            updateQuantity={this.props.updateQuantity}
                        /> :
                        <BasketEmpty />
                }
            </View>
        );
    }
}
