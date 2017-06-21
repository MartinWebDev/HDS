import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    TextStyle,
    PixelRatio
} from 'react-native';

import {
    NavigationScreenProp
} from 'react-navigation';

import { HeaderTitle } from './HeaderComponents/HeaderTitle';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

interface State { }

export class ProductDetailHeader extends Component<Props, State> {
    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <View key="BackButton" style={styles.backButtonArea}>
                    <TouchableOpacity style={styles.backButton} onPress={
                        () => {
                            this.props.navigation.goBack();
                        }
                    }>
                        <Text>回去</Text>
                    </TouchableOpacity>
                </View>

                <View key="Title" style={styles.titleArea}>
                    <HeaderTitle params={this.props.navigation.state.params} />
                </View>

                <View key="RightHandButton" style={styles.rightArea}>
                    {/* If we want to add a button on the right of the header, we can add that here */}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        borderBottomColor: "#999",
        borderBottomWidth: 1,
        flexDirection: "row",
        height: PixelRatio.getPixelSizeForLayoutSize(20)
    } as ViewStyle,
    backButtonArea: {
        width: 100,
        alignItems: "flex-start",
        justifyContent: "center"
    } as ViewStyle,
    titleArea: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    } as ViewStyle,
    rightArea: {
        width: 100,
        alignItems: "center",
        justifyContent: "center"
    } as ViewStyle,
    backButton: {
        //backgroundColor: "#0074D9",
        //borderColor: "#0041A6",
        //borderWidth: 1,
        //borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginLeft: 5
    } as ViewStyle,
    backButtonText: {
        color: "#FFF"
    } as TextStyle
});
