import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ImageStyle
} from 'react-native';

// Component
import { ReviewStarRating } from './ReviewStarRating';

// Data
import { IReview, Review } from '../../Services/ClientData/Review';

interface IProps {
    review: IReview;
}

interface IState { }

export class ProductReview extends Component<IProps, IState> {
    render(): JSX.Element {
        let r = this.props.review;

        return (
            <View style={styles.container}>
                <View style={styles.profile}>
                    {
                        (r.HeadImg != null && r.HeadImg.trim().length > 0) ?
                            <Image source={{ uri: r.HeadImg }} style={styles.profileImg} /> :
                            null
                    }
                    <Text style={styles.profileName}>{r.CustomerName}</Text>
                </View>

                <View style={styles.dateAndStar}>
                    <Text style={styles.reviewDate}>{r.CommentDateText}</Text>
                    <ReviewStarRating value={r.Rating} />
                </View>

                <View style={styles.reviewTextArea}>
                    <Text style={styles.reviewText}>{r.Content}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {} as ViewStyle,
    profile: {
        flexDirection: "row",
        justifyContent: "flex-start"
    } as ViewStyle,
    profileImg: {} as ImageStyle,
    profileName: {} as TextStyle,
    dateAndStar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    } as ViewStyle,
    reviewDate: {} as TextStyle,
    reviewTextArea: {} as ViewStyle,
    reviewText: {} as TextStyle
});
