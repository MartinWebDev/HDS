import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    PixelRatio,
    StyleSheet,
    TextStyle,
    ViewStyle,
    ImageStyle
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

import { IAccountSummaryDetails } from './AccountInterfaces';

interface IProps {
    navigation: NavigationScreenProp<any, any>;
    accountSummaryData: IAccountSummaryDetails;
}

interface IState { }

export class AccountSummaryBanner extends Component<IProps, IState> {
    render(): JSX.Element {
        let acc = this.props.accountSummaryData;

        return (
            <View style={styles.container}>
                <View style={styles.pictureArea}>
                    <Image source={{ uri: acc.ProfilePictureUri }} style={styles.picture} />
                </View>

                <View style={styles.summaryArea}>
                    <View style={styles.upperBioArea}>
                        <View style={styles.nameArea}>
                            <Text style={styles.name}>{this.props.accountSummaryData.ProfileName}</Text>
                        </View>

                        <View style={styles.alertArea}>
                            <Image
                                style={{
                                    height: PixelRatio.getPixelSizeForLayoutSize(11.5),
                                    width: PixelRatio.getPixelSizeForLayoutSize(11)
                                }}
                                source={require("../../Assets/Icons/HomeScreenHeader/Notifications.png")}
                            />
                        </View>
                    </View>

                    <View style={styles.bioArea}>
                        <Text style={styles.bio}>{this.props.accountSummaryData.ProfileBio}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const stylesValues = {
    profilePictureSize: {
        width: PixelRatio.getPixelSizeForLayoutSize(40),
        height: PixelRatio.getPixelSizeForLayoutSize(40)
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        height: stylesValues.profilePictureSize.height
    } as ViewStyle,
    pictureArea: {
        width: stylesValues.profilePictureSize.width,
        height: stylesValues.profilePictureSize.height
    } as ViewStyle,
    picture: {
        width: stylesValues.profilePictureSize.width,
        height: stylesValues.profilePictureSize.height,
        borderRadius: stylesValues.profilePictureSize.height / 2
    } as ImageStyle,
    summaryArea: {
        flex: 1,
        flexDirection: "column",
        paddingHorizontal: 8
    } as ViewStyle,
    upperBioArea: {
        height: 40,
        flexDirection: "row"
    } as ViewStyle,
    nameArea: {
        flex: 1
    } as ViewStyle,
    name: {
        fontSize: 18
    } as TextStyle,
    alertArea: {
        width: 40,
        alignItems: "center"
    } as ViewStyle,
    bioArea: {
        flex: 1,
        justifyContent: "center"
    } as ViewStyle,
    bio: {
        fontSize: 12
    } as TextStyle
});
