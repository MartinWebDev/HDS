// React
import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

// Components required
import { ScreenView } from '../GlobalComponents/ScreenView';

import { CategoryDetail } from './CategoryDetail';

// Component setup
interface Props {
    navigation: NavigationScreenProp<any, any>;
}

interface State {
    products: any[]; //TODO: Create interface for products list array
}

// Component create
export class CategoryDetailScreen extends Component<Props, State> {
    static navigationOptions = ({ navigation, screenProps }: any) => {
        const { state, setParams } = navigation;
        const { catId } = state.params;
        const { cartKey } = state.params;
        //const categoryName = state.params.categoryName; // TODO remember how this worked
        return {
            //title: "Category Products List..."
            title: cartKey == null ? "Loading..." : cartKey
        };
    };

    constructor(props: Props) {
        super(props);

        this.state = { products: [] };
    }

    render(): JSX.Element {
        return (
            <CategoryDetail products={this.state.products} navigation={this.props.navigation} />
        );
    }
}