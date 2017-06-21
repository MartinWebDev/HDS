// React
import React, { Component } from 'react';

import {
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TouchableHighlight
} from 'react-native';

// Styles
import { FashionProductThumbStyle } from '../Styles/GlobalStyles';

// Interfaces
import { IFashionProductSummary } from '../Services/ClientData/FashionProductSummary';

// Component set up
interface Props {
    productDetails: IFashionProductSummary;
}

interface State { }

// Component creation
export class FashionProductThumb extends Component<Props, State> {
    render (): JSX.Element {
        let p: IFashionProductSummary = this.props.productDetails;

        return (
            <TouchableHighlight style={FashionProductThumbStyle.container}>
                <View style={FashionProductThumbStyle.innerWrapper}>
                    <Image source={{ uri: p.BannerImgUrl }} style={FashionProductThumbStyle.image} />
                </View>
            </TouchableHighlight>
        );
    }
}