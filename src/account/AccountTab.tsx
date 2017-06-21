import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    ViewStyle,
    ImageStyle,
    TextStyle
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

import { TabStyles } from '../Styles/TabStyles';

// Import Child Components
import { ScreenView } from '../GlobalComponents/ScreenView';
import { ScreenSection } from '../GlobalComponents/ScreenSection';
import { ScreenSectionTitle } from '../GlobalComponents/ScreenSection/ScreenSectionTitle';

import { AccountSummaryBanner } from './AccountSummaryBanner';
import { AccountUpperMenuIcon } from './AccountUpperMenuIcon';

// Import interfaces, classes, and data
import { IAccountSummaryDetails, IAccountNotifications } from './AccountInterfaces';

import { AccountSummaryDetailsData, AccountNotifications } from './TempData';

interface IState {
    accountSummaryData: IAccountSummaryDetails;
    notifications: IAccountNotifications;
}

interface IProps {
    navigation: NavigationScreenProp<any, any>
}

export class AccountTab extends Component<IProps, IState> {
    static navigationOptions: any = ({ navigation, screenProps }: any) => {
        return {
            tabBarLabel: "我",
            tabBarIcon: ({ focused, tintColor }: any) => (
                <Image
                    source={
                        focused ?
                            require("../../Assets/Icons/Tabs/account-active.png") :
                            require("../../Assets/Icons/Tabs/account-inactive.png")
                    }
                    style={[TabStyles.TabIcon, { tintColor: tintColor }]}
                />
            )
        };
    };

    constructor(props: IProps) {
        super(props);

        this.state = {
            accountSummaryData: null,
            notifications: null
        }
    }

    componentDidMount() {
        this.setState({
            accountSummaryData: AccountSummaryDetailsData
        });
    }

    render(): JSX.Element {
        return (
            <ScreenView style={MyPageStyles.container}>
                {/* Bio Section */}
                <ScreenSection fullWidth={true} upperMargin={false}>
                    <ScreenSectionTitle title="个人中心" />

                    {
                        this.state.accountSummaryData != null ?
                            <AccountSummaryBanner
                                navigation={this.props.navigation}
                                accountSummaryData={this.state.accountSummaryData}
                            /> :
                            null
                    }
                </ScreenSection>

                {/* Upper Menu Icons Section */}
                <ScreenSection fullWidth={true}>
                    <View style={upperMenuStyles.container}>
                        <AccountUpperMenuIcon image={require("../../Assets/Icons/AccountTab/UpperMenu/payments.png")} navigation={this.props.navigation} menuText="待付款" />
                        <AccountUpperMenuIcon image={require("../../Assets/Icons/AccountTab/UpperMenu/send.png")} navigation={this.props.navigation} menuText="待收货" />
                        <AccountUpperMenuIcon image={require("../../Assets/Icons/AccountTab/UpperMenu/assess.png")} navigation={this.props.navigation} menuText="待评价" />
                        <AccountUpperMenuIcon image={require("../../Assets/Icons/AccountTab/UpperMenu/return.png")} navigation={this.props.navigation} menuText="退换货" />
                        <AccountUpperMenuIcon image={require("../../Assets/Icons/AccountTab/UpperMenu/all.png")} navigation={this.props.navigation} menuText="已结束" />
                    </View>
                </ScreenSection>

                {/* First Menu Options */}
                <ScreenSection fullWidth={true}>
                    <Text>Hello</Text>
                </ScreenSection>

                {/* Second Menu Options */}
                <ScreenSection fullWidth={true}>
                    <Text>Hello</Text>
                </ScreenSection>

                {/* Third Menu Options */}
                <ScreenSection fullWidth={true}>
                    <Text>Hello</Text>
                </ScreenSection>
            </ScreenView>
        );
    }
};

const upperMenuStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    } as ViewStyle,
    menuItem: {
        flex: 1
    } as ViewStyle
});

const MyPageStyles = StyleSheet.create({
    container: {
        flex: 1
    }
});
