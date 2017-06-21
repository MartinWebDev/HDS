import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View, 
    Image
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

import { TabStyles } from '../Styles/TabStyles';

interface State { }

interface Props {
    navigation: NavigationScreenProp<any, any>
}

export class BasketTab extends Component<Props, State> {
    static navigationOptions: any = ({ navigation, screenProps }: any) => {
        return {
            tabBarLabel: "购物车", 
            tabBarIcon: ({focused, tintColor}: any) => (
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

    render (): JSX.Element {
        return (
            <View>
                <Text>Hello Basket Tab</Text>
            </View>
        );
    }
}
