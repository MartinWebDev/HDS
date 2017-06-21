import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ImageStyle,
    Dimensions,
    PixelRatio,
    TouchableOpacity
} from 'react-native';

import { AttributeSelector } from './AttributeSelector';

// Interfaces/class
import {
    IProductAttributeMappings,
    IProductAttributeMappingsValue
} from '../../../Services/ClientData/ProductAttributeMappings';

interface IProps {
    attribute: IProductAttributeMappings;
    parentUpdateCallback: (attrId: number, valueId: number, removeId: number) => void;
}

interface IState {
    activeValueIndex: number;
}

export class DropdownList extends AttributeSelector<IState> { //Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = { activeValueIndex: null };
    }

    /**
     * In this example, the components renders a "dropdownlist" style selector.
     * On the screen this is rendered as clickable boxes but the key is that only one can be selected at once. 
     * @param valueId The ID of the attribute value which has been selected
     */
    updateActiveIndex(valueId: number) {
        let currentIndex: number = this.state.activeValueIndex;
        let required: boolean = this.props.attribute.is_required;

        var updateIndex: number = null;
        var removeIndex: number = null;

        // If we are cicking the same one again, and this attribute is not required, then we untick all options        
        if (currentIndex != null && currentIndex == valueId && !required) {
            updateIndex = null;
            removeIndex = currentIndex;
        }
        else {
            if (currentIndex != null) {
                removeIndex = currentIndex;
            }

            updateIndex = valueId;
        }

        this.setState({ activeValueIndex: updateIndex }, () => {
            this.props.parentUpdateCallback(this.props.attribute.id, updateIndex, removeIndex);
        });
    }

    render(): JSX.Element {
        let attr: IProductAttributeMappings = this.props.attribute;

        let opts: JSX.Element[] = this.props.attribute.attribute_values.map((value, index) => {
            return (
                <TouchableOpacity key={index.toString()} style={styles.option} onPress={
                    () => {
                        this.updateActiveIndex(value.id);
                    }
                }>
                    <Text>{value.name} ({value.price_adjustment.toFixed(2)})</Text>

                    <View style={styles.tick}>
                        {
                            (this.state.activeValueIndex != null && this.state.activeValueIndex == value.id) ?
                                <Image
                                    source={require("../../../../Assets/Icons/ProductDetails/attrTick.png")}
                                    style={styles.tickImg}
                                /> :
                                null
                        }
                    </View>
                </TouchableOpacity>
            );
        });

        return (
            <View style={styles.container}>
                <Text>{attr.text_prompt} :</Text>

                <View style={styles.optsContainer}>
                    {opts}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        borderBottomColor: "#CCC",
        borderBottomWidth: 1
    } as ViewStyle,
    optsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 4
    } as ViewStyle,
    option: {
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 5,
        paddingVertical: 8,
        marginHorizontal: 8,
        width: (Dimensions.get("window").width / 3) - (32),
        alignItems: "center",
        position: "relative"
    } as ViewStyle,
    promptText: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(8)
    } as TextStyle,
    optText: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(6)
    } as TextStyle,
    tick: {
        position: "absolute",
        right: 0,
        bottom: 0
    } as ViewStyle,
    tickImg: {
        height: PixelRatio.getPixelSizeForLayoutSize(10),
        width: PixelRatio.getPixelSizeForLayoutSize(12)
    } as ImageStyle
});