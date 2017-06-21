// React
import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ViewStyle
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

// Interfaces
import { ICategoryThumb } from './ShopInterfaces';

// Component setup
interface Props {
    catThumbs?: ICategoryThumb[],
    fakeThumbs?: number[],
    thumbStyles: any,
    navigation: NavigationScreenProp<any, any>
}

interface State { }

// Component creation
export class CategoryThumbList extends Component<Props, State> {
    render(): JSX.Element {
        let categoryThumbsOutput = this.props.catThumbs.map((thumb, i) => {
            return (
                <TouchableOpacity key={`cat${thumb.Id}`} onPress={
                    () => {
                        this.props.navigation.navigate("Category", { catId: thumb.Id, cartKey: thumb.LinkText })
                    }
                }>
                    <View style={this.props.thumbStyles.categoryThumb}>
                        <Image source={{ uri: thumb.ImgUri }} style={this.props.thumbStyles.categoryThumbImage} />

                        <Text style={{ textAlign: "center", fontSize: 16 }}>{thumb.LinkText}</Text>
                    </View>
                </TouchableOpacity>
            );
        });

        let fakeThumbsOutput = this.props.fakeThumbs.map((thumb, i) => {
            return (
                <View key={`fake${i}`} style={this.props.thumbStyles.categoryThumbFake}></View>
            );
        });

        return (
            <View style={categoryStyles.listWrapper}>
                {categoryThumbsOutput}

                {fakeThumbsOutput}
            </View>
        );
    }
}
const categoryStyles = StyleSheet.create({
    listWrapper: {
        flex: 1,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-around",
    } as ViewStyle
});
