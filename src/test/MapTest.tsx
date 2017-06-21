// / <reference path="../../hds-types/react-native-baidu-map/index.d.ts" />

import React, { Component } from 'react';

import {
    View,
    Text,
    Button
} from 'react-native';

// import {
//     Geolocation
// } from 'react-native-baidu-map';

// import {
//     Geolocation
// } from '../../node_modules/react-native-baidu-map/index.js';

import {
    Geolocation,
    CurrentPositionData
} from 'react-native-baidu-map';

// var BaiduMaps = require('react-native-baidu-map');
// var Geo = BaiduMaps.Geolocation;

interface IProps { }

interface IState {
    lat: number;
    long: number;
    address: string;
    json: string;
    requests: number;
    city: string;
    country: string;
}

export class MapTestScreen extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            lat: 0,
            long: 0,
            address: "",
            json: "",
            requests: 0,
            city: "",
            country: ""
        };
    }

    render(): JSX.Element {
        return (
            <View>
                <Button title="Where am i?" onPress={
                    () => {
                        Geolocation.getCurrentPosition().then((data: CurrentPositionData) => {
                            let r = this.state.requests;

                            this.setState({
                                json: JSON.stringify(data),
                                requests: ++r,
                                lat: data.latitude,
                                long: data.longitude,
                                address: data.address,
                                city: data.city,
                                country: data.country
                            });
                        });
                    }
                } />

                {/*<Text>{ this.state.json }</Text>*/}

                <Text>Requests: {this.state.requests}</Text>
                <Text>Latitude: {this.state.lat}</Text>
                <Text>Longitude: {this.state.long}</Text>
                <Text>Address: {this.state.address}</Text>
                <Text>City: {this.state.city}</Text>
                <Text>Country: {this.state.country}</Text>
            </View>
        );
    }
}
