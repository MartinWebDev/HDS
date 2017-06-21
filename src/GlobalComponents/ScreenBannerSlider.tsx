import React, { Component } from 'react';

import {
    View,
    Image,
    ViewStyle,
    ImageStyle,
    StyleSheet
} from 'react-native';

// Child Components
import { ActiveImageIndicator } from './SlidingImageBanner/ActiveImageIndicator';

// Interfaces
import { IBannerImage } from './GlobalInterfaces';

interface Props {
    images: IBannerImage[];
}

interface State {
    activeImageIndex: number;
    intervalId: number;
}

export class ScreenBannerSlider extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { activeImageIndex: 0, intervalId: null };
    }

    updateBannerImage() {
        let currentId = this.state.activeImageIndex;
        let maxId = this.props.images.length - 1;

        currentId++;

        if (currentId > maxId)
            currentId = 0;

        this.setState({ activeImageIndex: currentId });
    }

    componentDidMount() {
        if (this.state.intervalId == null) {
            var id: number = setInterval(this.updateBannerImage.bind(this), 2000);
            this.setState({ intervalId: id });
        }
    }

    componentWillUnmount() {
        if (this.state != null) {
            clearInterval(this.state.intervalId);
            this.setState({ intervalId: null });
        }
    }

    render(): JSX.Element {
        return (
            <View style={{ height: 200, position: "relative" } as ViewStyle}>
                {
                    this.props.images.length > 0 ?
                        <Image
                            source={{ uri: this.props.images[this.state.activeImageIndex].ImgUri }}
                            style={{ height: 200 }}
                        /> :
                        null
                }

                {
                    this.props.images.length > 0 ?
                        <ActiveImageIndicator
                            childStyle={styles.indicatorStyle}
                            count={this.props.images.length}
                            activeIndex={this.state.activeImageIndex}
                        /> :
                        null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    indicatorStyle: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    } as ViewStyle
});