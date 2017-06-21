import React, { Component } from 'react';

import {
    View, 
    Text, 
    Image, 
    TouchableHighlight, 
    StyleSheet, 
    ViewStyle, 
    TextStyle
} from 'react-native';

interface Props { }

interface State { }

export class CountrySelector extends Component<Props, State> {
    constructor (props: any) {
        super(props);

        this.state = { searchValue: "" };
    }

    render (): JSX.Element {
        return (
            <View style={headerStyles.headerCountryPicker}>
                <Text>深圳</Text>
                <Image source={require("../../../Assets/Icons/HomeScreenHeader/DropdownArrowSmall.png")} />
            </View>
        );
    }
}

const headerStyles = StyleSheet.create({
    headerCountryPicker: {
        width: 60, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-around"
    } as ViewStyle
});