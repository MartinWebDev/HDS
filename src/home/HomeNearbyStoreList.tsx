import React, { Component } from 'react';

import {
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TextStyle, 
    ViewStyle
} from 'react-native';

import { INearbyStore } from './HomeInterfaces';

import { NearbyStore } from './HomeNearbyStoreList/HomeNearbyStore';

interface Props {
    data: INearbyStore[];
}

interface State { }

export class HomeNearbyStoreList extends Component<Props, State> {    
    render (): JSX.Element {
        let stores = this.props.data.map((store: INearbyStore, i: number) => {
            return (
                <NearbyStore key={store.Id} storeDetails={store} />
            );
        });
        return (
            <View style={listStyle.container}>
                {stores}
            </View>
        );
    }
}

const listStyle = StyleSheet.create({
    container: {
        flex: 1
    } as ViewStyle
});