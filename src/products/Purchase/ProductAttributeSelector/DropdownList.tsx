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

interface IState {
    activeValueIndex: number;
}

/**
 * When you want to write a new Component for a different type of it is best to extend the abstract class
 * AttributeSelector.tsx as this defines a fixed "IProps" interface to ensure all
 * components will be consistent. The IState interface can be written in any way you
 * want however.
 * When extending the abstract class AttributeSelector<T> T refers to the IState interface
 * so when you define your state interface, be sure to pass that in as value T
 */
export class DropdownList extends AttributeSelector<IState> { //Component<IProps, IState> {
    constructor() {
        super();

        this.state = { activeValueIndex: null };
    }

    /**
     * In this example, the components renders a "dropdownlist" style selector.
     * On the screen this is rendered as clickable boxes but the key is that only one can be selected at once.
     * IMPORTANT: When you write a new component, the most important thing here is to make sure your new component
     *            uses the callback correctly.
     *            The callback function requires 3 parameters.
     *                attrId - This is ID of the attribute itself that we are goiing to change
     *                valueId - If you want to select an option, pass in the ID of the attribute value here
     *                removeId - If you want to unselect an option, pass in the ID of the attribute value here
     *            Both the valueId, and removeId can be passed null. Passing null means this action would not be taken
     * As long as you use this function correctly as described above the rest of this component can be 100% up to
     * the developer. Doing it this way will ensure that any attribute selector type will always update the price
     * adjustment correctly, so be sure to follow this same structure carefully to avoid bugs in future.
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
                    <Text>{value.name}</Text>

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
        marginTop: 4,
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