import React, { Component } from 'react';

import {
    Text, 
    View, 
    Image, 
    TouchableHighlight, 
    StyleSheet, 
    ViewStyle
} from 'react-native';

// Imports for required child components
import { SearchBar } from './HeaderComponents/HomeScreenSearchBar';
import { CountrySelector } from './HeaderComponents/CitySelector';
import { HeaderNotifications } from './HeaderComponents/HeaderNotifications';

interface Props { }

interface State { }

export class HomeScreenHeader extends Component<Props, State> {
    render (): JSX.Element {
        return (
            <View style={headerStyles.headerContainer}>
                <CountrySelector />

                <View style={headerStyles.headerSearchBar}>
                   <SearchBar/>
                </View>
                
                <HeaderNotifications />
            </View>
        );
    }
}

const headerStyles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row", 
        alignItems: "center", 
        height: 40
    } as ViewStyle, 
    headerSearchBar: {
        flex: 1
    } as ViewStyle
});