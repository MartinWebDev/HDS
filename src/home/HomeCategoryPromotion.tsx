import React, { Component } from 'react';

import {
    View, 
    Text, 
    StyleSheet, 
    Image, 
    ViewStyle
} from 'react-native';

import { 
    ICategoryPromotionArea, 
    ICategoryPromotionAreaColumn, 
    ICategoryPromotionAreaRow 
} from './HomeInterfaces';

interface Props {
    data: ICategoryPromotionArea;
}

interface State { }

export class HomeCategoryPromotion extends Component<Props, State> {
    render (): JSX.Element {
        let columns = this.props.data.Columns.map((column: ICategoryPromotionAreaColumn, i: number) => {
            let numberOfItems: number = column.Rows.length;

            return (
                <View key={i} style={categoryPromoStyles.column}>
                    {
                        column.Rows.map((row: ICategoryPromotionAreaRow, j: number) => {
                            return (
                                <View key={row.Id} style={categoryPromoStyles.row}>
                                    <Image source={{ uri: row.ImgUri }} style={{
                                        height: 180 / numberOfItems
                                    }} />
                                </View>
                            )
                        })
                    }
                </View>
            );
        });

        return (
            <View style={categoryPromoStyles.container}>
                {columns}
            </View>
        );
    }
}

const categoryPromoStyles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: "row"
    } as ViewStyle, 
    column: {
        flex: 1, 
        flexDirection: "column"
    } as ViewStyle, 
    row: {
        flex: 1
    } as ViewStyle
});