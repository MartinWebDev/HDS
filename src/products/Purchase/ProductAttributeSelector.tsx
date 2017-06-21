/**
 * IMPORTANT
 * ---------
 * If you want to add a new type of attribute selector, follow the numbered instructions in the comments in this file.
 * 1. Import the new Component to render the selector type you have written
 * 2. Edit the constant AttributeSelectorTypes to include the text which defines what type of selector this is.
 *    This is the value which is returned from the server API in the attribute mapping array.
 * 3. Edit the switch 
 */

import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    ViewStyle
} from 'react-native';

/**
 * 1. Firstly, add your new attribute selector component to the list of imports here.
 *    EG: import { CheckBoxes } from './ProductAttributeSelector/CheckBoxes';
 */
import { DropdownList } from './ProductAttributeSelector/DropdownList';

// Interfaces/class
import {
    IProductAttributeMappings,
    IProductAttributeMappingsValue
} from '../../Services/ClientData/ProductAttributeMappings';

interface IProps {
    attribute: IProductAttributeMappings;
    updateCallback: (attrId: number, valueId: number, removeId: number) => void;
}

interface IState { }

/**
 * 2. Take the text value from the api which tells the client what type of selector to render,
 *    and add that to this constant.
 *    EG: Checkbox: "Checkbox" as string
 */
const AttributeSelectorTypes = {
    DropdownList: "DropdownList" as string
};

export class ProductAttributeFactory extends Component<IProps, IState> {
    render(): JSX.Element {
        let component: JSX.Element;

        /**
         * 3. Add a case to this switch statement to support your new component type.
         *    The most important bit here is that you MUST pass in the attribute value to your component,
         *    this is needed for the rendering in your component.
         *    AND you MUST pass in the callback function I created which you will use in your component to
         *    turn selected attribute values on or off.
         *    Read the comments in the PurpuchaseProductModal.tsx file around the "handleUpdateAttributeSelector"
         *    method, and the comments in my DropdownList component on how to use this function correctly. 
         */
        switch (this.props.attribute.attribute_control_type_name) {
            case AttributeSelectorTypes.DropdownList:
                component = <DropdownList
                    attribute={this.props.attribute}
                    parentUpdateCallback={this.props.updateCallback}
                />
                break;
        }

        return (
            <View style={styles.container}>{component}</View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 8
    } as ViewStyle
});