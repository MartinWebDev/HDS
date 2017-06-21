import React, { Component } from 'react';

import {
    View, 
    Text, 
    StyleSheet, 
    Image, 
    TextStyle, 
    ViewStyle
} from 'react-native';

import { INearbyStore } from '../HomeInterfaces';

interface Props {
    storeDetails: INearbyStore
}

interface State { }

export class NearbyStore extends Component<Props, State> {
    render (): JSX.Element {
        let s: INearbyStore = this.props.storeDetails;

        return (
            <View style={itemStyle.itemWrapper}>
                <View style={itemStyle.leftColumn}>
                    <View style={itemStyle.imageWrapper}>
                        <Image style={itemStyle.imageWrapper} source={{ uri: s.ImgUrl }} />
                    </View>
                </View>

                <View style={itemStyle.rightColumn}>
                    <View style={[ itemStyle.storeNameDetails, itemStyle.sectionRow ]}>
                        <View style={{ alignItems: "center" } as ViewStyle}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={itemStyle.storeNameDetailsPart}>{s.StoreDetailsLeft}</Text>
                                <Text style={itemStyle.storeNameDetailsPart}>{s.StoreDetailsRight}</Text>
                            </View>

                            <View>
                                <Text>{s.StoreDetailsArea}</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={[ itemStyle.storeSummaryArea, itemStyle.pipedRow ]}>
                        <View style={[itemStyle.pipedSection, itemStyle.pipedSectionLeft]}>
                            <Text>人气 {s.Popularity}</Text>
                        </View>

                        <View style={itemStyle.pipeDivider}>
                            <Text>|</Text>
                        </View>

                        <View style={[itemStyle.pipedSection, itemStyle.pipedSectionRight]}>
                            <Text>评论 {s.Comments}</Text>
                        </View>
                    </View>

                    <View style={[ itemStyle.dividingLine ]}>
                        <Text>-</Text>
                    </View>

                    <View style={[ itemStyle.storeAddressRow, itemStyle.pipedRow]}>
                        <View style={[ 
                            itemStyle.pipedSection, 
                            itemStyle.pipedSectionLeft, { 
                                alignItems: "center", 
                                justifyContent: "flex-end", 
                                flexDirection: "row" 
                            } as ViewStyle 
                        ]}>
                            <Image 
                                source={require("../../../Assets/Icons/StoreDetailsIcons/address.png")} 
                                style={{ height: 13, width: 10, marginRight: 5 }} 
                            />
                            <Text>{s.Address}</Text>
                        </View>

                        <View style={itemStyle.pipeDivider}>
                            <Text>|</Text>
                        </View>

                        <View style={[ itemStyle.pipedSection, itemStyle.pipedSectionRight ]}>
                            <Text>更多优惠</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const itemStyle = StyleSheet.create({ 
    itemWrapper: {
        flex: 1, 
        flexDirection: "row", 
        marginBottom: 10
    } as ViewStyle, 
    leftColumn: {
        width: 115, 
        marginRight: 10
    } as ViewStyle, 
    imageWrapper: {
        width: 115, 
        height: 115
    } as ViewStyle, 
    rightColumn: {
        flex: 1, 
        flexDirection: "column", 
        justifyContent: "space-between", 
        alignItems: "stretch"
    } as ViewStyle, 
    storeNameDetails: {

    } as ViewStyle, 
    storeNameDetailsPart: {
        marginHorizontal: 10
    } as TextStyle, 
    storeSummaryArea: {
        flexDirection: "row"
    } as ViewStyle, 
    storeAddressRow: {
        flexDirection: "row"
    } as ViewStyle, 
    pipedRow: {
        flexDirection: "row"
    } as ViewStyle, 
    pipedSection: {
        flex: 1
    } as ViewStyle, 
    pipedSectionLeft: {
        alignItems: "flex-end"
    } as ViewStyle, 
    pipedSectionRight: {
        alignItems: "flex-start"
    } as ViewStyle, 
    pipeDivider: {
        width: 20, 
        alignItems: "center"
    } as ViewStyle, 
    sectionRow: {
        flex: 1, 
        alignItems: "center", 
        justifyContent: "space-between"
    } as ViewStyle, 
    dividingLine: {
        width: 50, 
        height: 2, 
        backgroundColor: "#CCC", 
        marginVertical: 5, 
        alignSelf: "center"
    } as ViewStyle, 
});