import React, { Component } from 'react';

import {
    View,
    Image
} from 'react-native';

interface IProps {
    imageUri: string;
    screenWidth: number;
}

interface IState {
    height: number;
    width: number;
}

export class ProductDescriptionImage extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            width: 0,
            height: 50
        };
    }

    componentDidMount() {
        // Calculator aspect ratio and new height, then assign height and width to component state
        Image.getSize(
            this.props.imageUri,
            (w, h) => {
                // Screen width (s)
                let s = this.props.screenWidth;

                // Calculate new height for image
                let newHeight = (h / w) * s;

                //  Save into State
                this.setState({ width: this.props.screenWidth, height: newHeight });
            },
            (err) => {
                console.warn(err);
            }
        );
    }

    render(): JSX.Element {
        return (
            <View>
                <Image
                    source={{ uri: this.props.imageUri }}
                    style={{ width: this.state.width, height: this.state.height }}
                />
            </View>
        );
    }
}