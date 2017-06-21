import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageStyle
} from 'react-native';

import {
    NavigationScreenProp
} from 'react-navigation';

interface IProps {
    navigation: NavigationScreenProp<any, any>;
    menuText: string;
    image: any;
}

interface IState { }

export class AccountUpperMenuIcon extends Component<IProps, IState> {
    render(): JSX.Element {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Image source={this.props.image} />
                {/*{this.props.children}*/}
                <Text>{this.props.menuText}</Text>
            </View>
        );
    }
}
