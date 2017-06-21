import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ViewStyle,
    TextStyle,
    PixelRatio,
    TouchableOpacity,
    Animated,
    Dimensions
} from 'react-native';

import {
    IProductAttributeMappingsValue,
    IProductAttributeMappings
} from '../../Services/ClientData/ProductAttributeMappings';

import { ProductAttributeFactory } from './ProductAttributeSelector';

interface ActiveAttributes {
    attributeIndex: number;
    attributeValueIndexes: number[];
}

interface IProps {
    productName: string;
    imgUri: string;
    productAttributes: IProductAttributeMappings[];
    unitPrice: number;
    close: () => void;
}

interface IState {
    slideUpDownAnimation: Animated.Value;
    quantity: number;
    productAttributes: IProductAttributeMappings[];
    activeAttributes: ActiveAttributes[];
}

export class PuchaseProductModal extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            slideUpDownAnimation: new Animated.Value(-Dimensions.get("window").height),
            quantity: 1,
            productAttributes: this.props.productAttributes, // Use this local state copy to control the changes. 
            //                                                  Since we can't change the prop values, this is fine. 
            activeAttributes: []
        };
    }

    componentDidMount() {
        // This little animation will make the white box area slide up while the background fades.
        // I think this is quite a nice way to open this section and quite consistent with other apps.
        Animated.timing(
            this.state.slideUpDownAnimation,
            {
                toValue: 0,
                duration: 200
            }
        ).start();
    }

    /**
     * This is the hardest section of this page. The child components for the attributes can be in any number
     * available and they could be of several different types (dropdownlist, check boxes, etc) so this function has 
     * written very carefully to support any possible future type that may want to be added.
     * If you want to add a new type of attribute selector you need to create the class to draw it,
     * then refer to the comments in "ProductAttributeSelector.tsx" for instructions on the next step. 
     * @param attrId This is the outer index for the attribute. 
     * @param valueId This is the new value we want to add. If this is null, do not add anything.
     * @param removeValue This is the new value we want to remove. If this is null, do not remove anything.
     */
    handleUpdateAttributeSelector(attrId: number, valueId: number, removeId: number): void {
        /**
         * Loops: 
         * i: state.productAttributes
         * j: state.productAttributes[i].attribute_values
         * k: state.activeAttributes
         * l: state.activeAttributes[k].attributeValueIndexes
         * Note: We can forcefully exit a for loop early by setting the index to a value above the loop's check
         * IE: if the loop tests "i < array.length" we can exit early by setting "i = array.length"
         */
        /**
         * Structure
         * ---------
         * We start by knowing the ID of the attribute and the chosen value.
         * We also know if it is to be added or removed.
         * We need to loop through the attributes, and find the index of the ID,
         * then loop through the values of it and find the index of the value ID.
         *
         * -If we are adding a new value, then we first loop though the current active indexes, and check for a match
         * -If we do not find a match, we add a new one into the array, then we add the value ID into that.
         * -If we do find a match, then we loop through the selected value indexes and check for a match.
         * -If we do not find a match, we add this index to the array. If we do find one, we do nothing, it's already there.
         *
         * -If we are removing a value, then we first loop through the current active indexes, and check for a match
         * -If we don't find a match, we can skip the rest. This shouldn't happen, but just in case.
         * -If we find a match, start searching the value indexes.
         * -Loop through the value indexes and look for a match to the value ID's indexes.
         * -If we find a match, remove it, then exit this loop.
         * -After this loop, check the size of the array now, if the array is empty, then remove the parent array too.
         * -Once we have results from inner most arrays we can exit some parent loops too, so check as we go along.
         *
         * -Once the array has been correctly updated, save this into the state and the view should re-render.
         *
         * -After this checking, we can save the new state value.
         */
        let attr = this.state.productAttributes;
        let active = this.state.activeAttributes;

        /**
         * Whenever you are adding to, or removing from an array which is also the control test for a loop
         * DO NOT perform add/remove functions directly on that array!!
         * You will only cause an overflow error when the loop reaches the end and suddenly there are elements missing.
         * Instead you should always make a second copy of the array, and perform your actions against that.
         * It gets even more complicated when you want to add or remove multiple values,
         * as even this solution has the same problem after you've performed one action, but as we are only doing one
         * add or remove in this instance, then a copy is ok here this time. 
         * NOTE: If you need to add or remove multiple, then instead of making changes to the array inside the loop,
         * record the new values you want to add, or list the indexes you want to remove, then do that in a NEW loop
         * after of your first loop. But guess what? THIS has a problem too! If you remove multiple from an array
         * based on those indexes, you will STILL get the same problem where the array is suddenly not long enough
         * and you get an overflow issue. Also, the indexes after the one you move will no longer match the ones you want
         * The solution for this? Run the loop BACKWARDS.
         * IE: Instead of "for (var i = 0; i < array.length; i++)" do "for (var i = array.length - 1; i >= 0; i--)"
         * If you do this, when you remove an element, the fact that the array is now shorter doesn't matter because
         * you're not moving to the PREVIOUS record, not the next one, so no more overflow,
         * and your index will always be correct.
         */
        let newActive = this.state.activeAttributes;

        var outerIndex: number;
        var innerAddIndex: number;
        var innerRemoveIndex: number;

        // Loop through state.attributes
        for (var i = 0; i < attr.length; i++) {
            // If the ID matches the ID passed into the function, we have the outer index
            if (attr[i].id == attrId) {
                outerIndex = i;

                let attrVals = attr[i].attribute_values;

                // Loop through the attribute values at this index
                for (var j = 0; j < attrVals.length; j++) {
                    // If the attribute option value matches the function parameter, we have the inner index
                    if (attrVals[j].id == removeId) {
                        innerRemoveIndex = j;

                        // Now we know the outer and inner index we need to either add or remove. So let's do that.
                        if (removeId != null) {
                            // WE ARE GOING TO REMOVE ONE HERE
                            // Loop through active indexes and look for an index that matches
                            for (var k = 0; k < active.length; k++) {
                                if (active[k].attributeIndex == outerIndex) {
                                    for (var l = 0; l < active[k].attributeValueIndexes.length; l++) {
                                        if (active[k].attributeValueIndexes[l] == innerRemoveIndex) {
                                            // REMOVE THIS ONE
                                            newActive[k].attributeValueIndexes.splice(l, 1);
                                        }
                                    }

                                    // If the array is now empty, remove the whole thing
                                    if (active[k].attributeValueIndexes.length == 0) {
                                        newActive.splice(k, 1);
                                    }
                                }
                            }
                        }
                    }

                    if (attrVals[j].id == valueId) {
                        innerAddIndex = j;

                        if (valueId != null) {
                            // WE ARE GOING TO ADD ONE HERE
                            // Loop through the active indexes and look for a match. 
                            // If we have one, record the index of the active match. 
                            // If not, we will insert a new one and use THAT index. 
                            // Default to this, this will be the new one if we add one.
                            var existingIndex: number = active.length;

                            // We will check that the value isn't already there and don't add it again. 
                            // This shouldn't happen, but it is always better to code defensively. 
                            var valueExists: boolean = false;

                            for (var k = 0; k < active.length; k++) {
                                if (active[k].attributeIndex == outerIndex) {
                                    existingIndex = k;

                                    // Check for existing value index
                                    for (var l = 0; l < active[k].attributeValueIndexes.length; l++) {
                                        if (active[k].attributeValueIndexes[l] == innerAddIndex) {
                                            valueExists = true;
                                        }
                                    }
                                }
                            }

                            // If existing index still matches length, we didn't find a match, so add one. 
                            if (existingIndex == active.length) {
                                newActive.push({
                                    attributeIndex: outerIndex,
                                    attributeValueIndexes: []
                                } as ActiveAttributes);
                            }

                            // Insert new value
                            if (!valueExists) {
                                newActive[existingIndex].attributeValueIndexes.push(innerAddIndex);
                            }
                        }
                    }
                }

                // We can now exit loop i
                //i = attr.length;
            }
        }

        // Once all the annoying stuff is done, the newActive array is now the new state we want. So update it. 
        this.setState({
            activeAttributes: newActive
        });
    }

    closeModal() {
        Animated.timing(
            this.state.slideUpDownAnimation,
            {
                toValue: -Dimensions.get("window").height,
                duration: 200
            }
        ).start(this.props.close.bind(this));
    }

    calculateAdjustedPrice(unitPrice: number): number {
        var adjustedPrice: number = unitPrice;
        var activeAttr = this.state.activeAttributes;

        var outerIndex: number = null;
        var innerIndex: number = null;

        for (var i = 0; i < activeAttr.length; i++) {
            outerIndex = activeAttr[i].attributeIndex;

            for (var j = 0; j < activeAttr[i].attributeValueIndexes.length; j++) {
                innerIndex = activeAttr[i].attributeValueIndexes[j];

                adjustedPrice += this.state.productAttributes[outerIndex].attribute_values[innerIndex].price_adjustment;
            }
        }

        return adjustedPrice;
    }

    render(): JSX.Element {
        let { slideUpDownAnimation } = this.state;
        const yuanSymbol = "¥";

        // Calculate adjusted price
        let adjustedUnitPrice = this.calculateAdjustedPrice(this.props.unitPrice);
        let totalPrice = adjustedUnitPrice * this.state.quantity;

        let attributeSelectors = this.state.productAttributes.map((attr, index) => {
            return (
                <ProductAttributeFactory
                    key={index.toString()}
                    attribute={attr}
                    updateCallback={this.handleUpdateAttributeSelector.bind(this)}
                />
            );
        });

        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Animated.View style={[styles.innerWrapper, { marginTop: slideUpDownAnimation }]}>
                        <View key="PictureNameClose" style={styles.pictureNameClose}>
                            <Image
                                source={{ uri: this.props.imgUri }}
                                style={{
                                    height: PixelRatio.getPixelSizeForLayoutSize(40),
                                    width: PixelRatio.getPixelSizeForLayoutSize(40)
                                }}
                            />

                            <View style={styles.namePriceSection}>
                                <Text style={styles.productTitle}>{this.props.productName}</Text>

                                <Text style={styles.adjustedUnitPrice}>
                                    {
                                        `${yuanSymbol}${adjustedUnitPrice.toFixed(2)}`
                                        /* TODO!!!! Change to include adjustments!! */
                                    }
                                </Text>
                            </View>

                            <View style={styles.closeIconSection}>
                                <TouchableOpacity onPress={this.closeModal.bind(this)}>
                                    <Image
                                        source={require("../../../Assets/Icons/General/close.png")}
                                        style={{
                                            height: PixelRatio.getPixelSizeForLayoutSize(8),
                                            width: PixelRatio.getPixelSizeForLayoutSize(8)
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View key="AttributeSelector">
                            {attributeSelectors}
                        </View>

                        <View key="QuantityTotalPrice" style={styles.quantityTotalPrice}>
                            <View key="QuantitySelector" style={styles.quantitySection}>
                                <Text>数量</Text>

                                <View style={quantityStyles.container}>
                                    <TouchableOpacity style={quantityStyles.down} onPress={
                                        () => {
                                            if (this.state.quantity > 1)
                                                this.setState({ quantity: this.state.quantity - 1 });
                                        }
                                    }>
                                        <Text style={quantityStyles.downText}>-</Text>
                                    </TouchableOpacity>

                                    <View style={quantityStyles.quantity}>
                                        <Text style={quantityStyles.quantityText}>{this.state.quantity}</Text>
                                    </View>

                                    <TouchableOpacity style={quantityStyles.up} onPress={
                                        () => {
                                            this.setState({ quantity: this.state.quantity + 1 });
                                        }
                                    }>
                                        <Text style={quantityStyles.upText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.totalPriceSection}>
                                <Text style={styles.totalPrice}>{`${yuanSymbol}${totalPrice.toFixed(2)}`}</Text>
                            </View>
                        </View>

                        <View key="PurchaseButton" style={styles.purchaseButtonArea}>
                            <TouchableOpacity style={styles.purchaseButton} onPress={() => {
                                alert("!BUY ME!");
                            }}>
                                <View>
                                    <Text style={styles.purchaseButtonText}>确定</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#666666AA",
        justifyContent: "flex-end",
        width: "100%"
    } as ViewStyle,
    wrapper: {
        backgroundColor: "#FFF",
    } as ViewStyle,
    innerWrapper: {
        padding: 10
    } as ViewStyle,
    pictureNameClose: {
        flexDirection: "row",
        borderBottomColor: "#CCC",
        borderBottomWidth: 1
    } as ViewStyle,
    namePriceSection: {
        flex: 1
    } as ViewStyle,
    closeIconSection: {
        width: PixelRatio.getPixelSizeForLayoutSize(8),
        marginLeft: 4
    } as ViewStyle,
    quantityTotalPrice: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8
    } as ViewStyle,
    quantitySection: {} as ViewStyle,
    totalPriceSection: {
        justifyContent: "flex-end"
    } as ViewStyle,
    totalPrice: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(8),
        color: "#ff0006"
    } as TextStyle,
    adjustedUnitPrice: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(6),
        color: "#ff0006"
    } as TextStyle,
    productTitle: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(7),
    } as TextStyle,
    purchaseButtonArea: {
        alignItems: "center",
        justifyContent: "center"
    } as ViewStyle,
    purchaseButton: {
        backgroundColor: "#ff0006",
        paddingVertical: 12,
        paddingHorizontal: 48
    } as ViewStyle,
    purchaseButtonText: {
        color: "#FFF"
    } as TextStyle
});

const quantityStyles = StyleSheet.create({
    container: {
        flexDirection: "row"
    } as ViewStyle,
    down: {
        borderWidth: 1,
        borderColor: "#CCC",
        width: PixelRatio.getPixelSizeForLayoutSize(12)
    } as ViewStyle,
    quantity: {
        borderTopWidth: 1,
        borderTopColor: "#CCC",
        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
        width: PixelRatio.getPixelSizeForLayoutSize(20)
    } as ViewStyle,
    up: {
        borderWidth: 1,
        borderColor: "#CCC",
        width: PixelRatio.getPixelSizeForLayoutSize(12)
    } as ViewStyle,
    downText: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(8),
        color: "#ff0006",
        textAlign: "center"
    } as TextStyle,
    quantityText: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(8),
        textAlign: "center"
    } as TextStyle,
    upText: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(8),
        color: "#ff0006",
        textAlign: "center"
    } as TextStyle
});
