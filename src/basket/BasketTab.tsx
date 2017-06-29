import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

import { TabStyles } from '../Styles/TabStyles';

// Global Components
import { ScreenView } from '../GlobalComponents/ScreenView';

// Child Components
import { BasketDetails } from './BasketDetails';

// Data
import { IShoppingCartVendor, IShoppingCartItem } from '../Services/ClientData/ShoppingCart';

// Services
import { IShoppingCartService, ShoppingCartService } from '../Services/ShoppingCartService';
import { ICustomerService, CustomerService } from '../Services/CustomerService';

interface IState {
    cart: IShoppingCartVendor[];
}

interface IProps {
    navigation: NavigationScreenProp<any, any>;
}

export class BasketTab extends Component<IProps, IState> {
    static navigationOptions: any = ({ navigation, screenProps }: any) => {
        return {
            tabBarLabel: "购物车",
            tabBarIcon: ({ focused, tintColor }: any) => (
                <Image
                    source={
                        focused ?
                            require("../../Assets/Icons/Tabs/basket-active.png") :
                            require("../../Assets/Icons/Tabs/basket-inactive.png")
                    }
                    style={[TabStyles.TabIcon, { tintColor: tintColor }]}
                />
            )
        };
    };

    constructor(props: IProps) {
        super(props);

        this.state = { cart: [] };
    }

    componentDidMount() {
        let custService: ICustomerService = new CustomerService();

        custService.GetCustomerId().then((custId) => {
            let cartService: IShoppingCartService = new ShoppingCartService();

            cartService.GetShoppingCartItems(custId).then((items) => {
                this.setState({ cart: items });
            });
        });
    }

    handleUpdateQuantity(vendorId: number, cartItemId: number, qty: number): void {
        //console.warn(`Handle Quantity. Vendor: ${vendorId} - Cart Item: ${cartItemId} - Qty: ${qty}`);
        // Make copy of state array, find item in array, update quantity, save state. 
        var cart = this.state.cart;
        let vendorIndex = cart.map((c) => { return c.VendorId; }).indexOf(vendorId);

        if (vendorIndex != -1) {
            let itemIndex = cart[vendorIndex].CarItems.map((c) => { return c.Id; }).indexOf(cartItemId);

            if (itemIndex != -1) {
                cart[vendorIndex].CarItems[itemIndex].Quantity += qty;

                // TODO!!!!! Send request to cart API to update shopping cart!
                this.setState({ cart: cart });
            }
        }
    }

    render(): JSX.Element {
        return (
            <View style={{ flex: 1 }}>
                <BasketDetails
                    navigation={this.props.navigation}
                    cart={this.state.cart}
                    updateQuantity={this.handleUpdateQuantity.bind(this)}
                />
            </View>
        );
    }
}
