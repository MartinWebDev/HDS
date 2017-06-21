// React
import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet,
    ScrollView,
    ViewStyle
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

// Components required
import { ScreenView } from '../GlobalComponents/ScreenView';

import { ProductDetail } from './ProductDetail';

// Services
import { IFavouriteService, FavouriteService } from '../Services/FavouriteService';
import { ICustomerService, CustomerService } from '../Services/CustomerService';

// Data
import { IProduct, Product } from '../Services/ClientData/Product';
import { IProductService, ProductService } from '../Services/ProductService';
import { IReview, Review } from '../Services/ClientData/Review';

// Component setup
interface Props {
    navigation: NavigationScreenProp<any, any>;
}

interface State {
    productId: number;
    productDetails: IProduct;
    productReviews: IReview[];
}

// Component create
export class ProductDetailScreen extends Component<Props, State> {
    static navigationOptions = ({ navigation, screenProps }: any) => {
        const { state, setParams } = navigation;
        //const productName = state.params.productName;
        //const { productId } = state.params;

        return {
            title: "Loading..."
        };
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            productDetails: null,
            productId: null,
            productReviews: []
        };
    }

    componentDidMount() {
        const { state, setParams } = this.props.navigation;
        const { params } = state;
        const { productId } = params;

        var productService = new ProductService();
        var customerService = new CustomerService();

        customerService.GetCustomerId()
            .then((custId) => {
                productService.GetProductReviews(productId, 0, 1, 1).then((response) => {
                    this.setState({
                        productReviews: response
                    });
                });

                productService.GetProductDetails(productId, custId).then((response) => {
                    this.setState({
                        productDetails: response
                    });

                    // Update title after we have the details
                    setParams({
                        title: response.Name
                    });
                });
            })
            .catch((err) => {
                console.log(err);
                alert("Couldn't retrieve customer ID");
            });
    }

    handleToggleFavourite() {
        let fServ: IFavouriteService = new FavouriteService();
        let cServ: ICustomerService = new CustomerService();

        cServ.GetCustomerId()
            .then((custId: number) => {
                fServ.ToggleFavourite(custId, this.state.productDetails.Id, this.state.productDetails.IsCollect)
                    .then((isSuccess: boolean) => {
                        if (isSuccess) {
                            // Toggle local variable
                            let p = this.state.productDetails;
                            p.IsCollect = !p.IsCollect;
                            this.setState({ productDetails: p });
                        }
                        else {
                            alert("Favourite service failed!");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        alert("Adding favourite failed!");
                    });
            })
            .catch((err) => {
                console.log(err);
                alert("Couldn't retrieve customer ID");
            });
    }

    render(): JSX.Element {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.state.productDetails != null ?
                        <ProductDetail
                            navigation={this.props.navigation}
                            productDetails={this.state.productDetails}
                            productReviews={this.state.productReviews}
                            onToggleFavourite={this.handleToggleFavourite.bind(this)}
                        /> :
                        null
                }
            </View>
        );
    }
}
