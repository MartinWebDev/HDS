import React, { Component } from 'react';

import { } from 'react-native';

// Interfaces/class
import {
    IProductAttributeMappings
} from '../../../Services/ClientData/ProductAttributeMappings';

interface IProps {
    attribute: IProductAttributeMappings;
    parentUpdateCallback: (attrId: number, valueId: number, removeId: number) => void;
}

export abstract class AttributeSelector<T> extends Component<IProps, T> {
    constructor(props?: IProps) {
        super(props);
    }
}
