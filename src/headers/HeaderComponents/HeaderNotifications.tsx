import React, { Component } from 'react';

import {
    Text, 
    View, 
    StyleSheet, 
    ViewStyle, 
    Image
} from 'react-native';

interface Props { }
interface State { }

export class HeaderNotifications extends Component<Props, State> {
    render (): JSX.Element {
        return (
            <View style={headerStyles.headerNotifications}>
                <Image source={require("../../../Assets/Icons/HomeScreenHeader/NotificationsSmall.png")} />
            </View>
        );
    }
}

const headerStyles = StyleSheet.create({
    headerNotifications: {
        width: 40
    } as ViewStyle
});