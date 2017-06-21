import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    LayoutChangeEvent,
    TextStyle,
    ViewStyle,
    ImageStyle,
    TouchableOpacity
} from 'react-native';

import { IMainPromotionItem } from './HomeInterfaces';

interface Props {
    data: IMainPromotionItem;
}

interface State {
    imageDimensions: { height: number, width: number };
}

export class HomeMainPromotionBanner extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            imageDimensions: {
                height: 0,
                width: 0
            }
        };
    }

    /** This function will run every time the layout gets updated or changed 
     * and it will recalculate the dimensions for the promotion image since it is not constant */
    layoutUpdateImageSize(event: LayoutChangeEvent) {
        //if (this.props.data != null) {
        // Get screen size and calculate view size
        const containerWidth = event.nativeEvent.layout.width; // - stylesObj.screenSectionMarginPlusPadding;

        // Get image size
        Image.getSize(
            this.props.data.ImgUri,
            (width, height) => {
                // From known width, calculate required image height
                this.setState({
                    imageDimensions: {
                        height: containerWidth * height / width,
                        width: containerWidth
                    }
                });
            },
            (error) => {
                console.error(error);
            }
        );
        //}
    }

    render(): JSX.Element {
        let imageDimensionStyles = StyleSheet.create({
            imageSize: {
                height: this.state.imageDimensions.height,
                width: this.state.imageDimensions.width
            } as ImageStyle
        });

        return (
            <View style={promoBannerStyles.container} onLayout={this.layoutUpdateImageSize.bind(this)}>
                {
                    <View style={promoBannerStyles.innerWrapper}>
                        <Image
                            source={{ uri: this.props.data.ImgUri }}
                            style={[promoBannerStyles.imageStyle, imageDimensionStyles.imageSize]}
                        />
                        <View style={promoBannerStyles.linkTextWrapper} >
                            <TouchableOpacity>
                                <Text style={promoBannerStyles.linkText}>{this.props.data.LinkText} &gt;</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        );
    }
}

// If we set up an object like this to build a stylesheet from later 
// we can save computation time later by avoiding the StyleSheet.flatten() method
// and instead accessing these values directly
const stylesObj = {
    // This is the added total of both the margin and padding from the section on the tab screen
    // when calculating how wide the image should be we need to subtract this from the total device width
    screenSectionMarginPlusPadding: 16
}

const promoBannerStyles = StyleSheet.create({
    container: {
        flex: 1
    } as ViewStyle,
    innerWrapper: {
        flex: 1,
        position: "relative"
    } as ViewStyle,
    imageStyle: {
        flex: 1
    } as ImageStyle,
    linkText: {
        color: "#FF0006",
        fontSize: 18
    } as TextStyle,
    linkTextWrapper: {
        padding: 4,
        backgroundColor: "#CCCCCC",
        flexDirection: "row",
        alignItems: "flex-end",
        position: "absolute",
        bottom: 0,
        right: 0,
    } as ViewStyle
});