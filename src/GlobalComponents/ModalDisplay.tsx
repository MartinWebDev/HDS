import React, { Component } from 'react';

import {
    View,
    Text,
    Modal,
    StyleSheet,
    ViewStyle,
    TextStyle,
    PixelRatio,
    Dimensions
} from 'react-native';

interface IProps {
    name: string;
    message: string;
    buttons: JSX.Element[];
    visible: boolean;
    onCloseCallback?: () => void;
}

interface IState {
    maximumWidth: number;
}

export class ModalDisplay extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        // Calculate 80% of screen width (when vertical) and set that as the maximum width of the modal
        const { height, width } = Dimensions.get("window");
        const orientation = (width > height) ? "l" : "p";

        const maxWidth = (orientation == "p" ? width : height) * 0.7;

        this.state = { maximumWidth: maxWidth };
    }

    onCloseCallBackDefault() { console.log(`Modal "${this.props.name}" closed`) }

    render(): JSX.Element {
        return (
            <Modal
                key={this.props.name}
                animationType="fade"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={
                    this.props.onCloseCallback || this.onCloseCallBackDefault
                }
            >
                <View style={styles.container}>
                    <View style={[styles.innerWrapper, { maxWidth: this.state.maximumWidth } as ViewStyle]}>
                        <View style={styles.modalTitleContainer}>
                            <Text style={styles.modalTitle}>{this.props.message}</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            {this.props.buttons}
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#666666AA"
    } as ViewStyle,
    innerWrapper: {
        alignItems: "center",
        backgroundColor: "#FFF"
    } as ViewStyle,
    modalTitleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#AAA",
        padding: PixelRatio.getPixelSizeForLayoutSize(3)
    } as ViewStyle,
    modalTitle: {
        textAlign: "center",
        fontSize: PixelRatio.getPixelSizeForLayoutSize(9)
    } as TextStyle,
    buttonContainer: {
        padding: PixelRatio.getPixelSizeForLayoutSize(3)
    } as ViewStyle
});