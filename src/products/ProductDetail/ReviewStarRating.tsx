import React, { Component } from 'react';

import {
    Image,
    View,
    StyleSheet,
    ViewStyle,
    ImageStyle
} from 'react-native';

interface IProps {
    value: number;
}

interface IState { }

class Star extends Component<{ imgKey: number }, any> { render(): JSX.Element { return (<Image key={this.props.imgKey.toString()} style={styles.star} source={require("../../../Assets/Icons/Review/star.png")} />); } }
class HalfStar extends Component<{ imgKey: number }, any> { render(): JSX.Element { return (<Image key={this.props.imgKey.toString()} style={styles.star} source={require("../../../Assets/Icons/Review/halfstar.png")} />); } }
class NoStar extends Component<{ imgKey: number }, any> { render(): JSX.Element { return (<Image key={this.props.imgKey.toString()} style={styles.star} source={require("../../../Assets/Icons/Review/nostar.png")} />); } }

export class ReviewStarRating extends Component<IProps, IState> {
    whichStar(value: number): number {
        if (value == 0.5) {
            return 0.5;
        }

        if (value > 0) {
            return 1;
        }

        return 0;
    }

    render(): JSX.Element {
        let v: number = this.props.value;

        let stars: JSX.Element[] = [];

        for (var i = 0; i < 5; i++) {
            let which = this.whichStar(v - i);

            switch (which) {
                case 1:
                    stars.push(<Star key={i} imgKey={i} />);
                    break;
                case 0.5:
                    stars.push(<HalfStar key={i} imgKey={i} />);
                    break;
                case 0:
                    stars.push(<NoStar key={i} imgKey={i} />);
                    break;
            }
        }

        return (
            <View style={styles.starContainer}>
                {stars}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: "row"
    } as ViewStyle,
    star: {
        height: 16,
        width: 16
    } as ImageStyle
});