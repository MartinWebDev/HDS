// Import all modules needed from react and react libraries
import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    Button
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

// Import all styles required for this tab
import { TabStyles } from '../Styles/TabStyles';

// Import required interfaces for data on this tab
import {
    IMainPromotionItem,
    ICategoryPromotionArea,
    INearbyStore
} from './HomeInterfaces';

import {
    IBannerImage
} from '../GlobalComponents/GlobalInterfaces';

// Import child components for this tab
import { ScreenView } from '../GlobalComponents/ScreenView';
import { ScreenSection } from '../GlobalComponents/ScreenSection';
import { ScreenSectionTitle } from '../GlobalComponents/ScreenSection/ScreenSectionTitle';
import { ScreenBannerSlider } from '../GlobalComponents/ScreenBannerSlider';

import { HomeMainPromotionBanner } from './HomeMainPromotionBanner';
import { HomeCategoryPromotion } from './HomeCategoryPromotion';
import { HomeNearbyStoreList } from './HomeNearbyStoreList';

// TEMP - Import fake data, this will later be replaced by API Services
import {
    BannerImages,
    MainPromotionItem,
    CategoryPromotionItems,
    NearbyStoreList
} from './TempData';

// Define how the state and props values must look for this component
interface State {
    BannerImagesList: IBannerImage[];
    MainPromotionBanner: IMainPromotionItem;
    CategoryPromotion: ICategoryPromotionArea;
    NearbyStores: INearbyStore[];
}

interface Props {
    navigation: NavigationScreenProp<any, any>
}

/** HomeTab.tsx
 * This is the tab screen definition for the home tab of the initial page within the stack navigator.
 */
export class HomeTab extends Component<Props, State> {
    static navigationOptions: any = ({ navigation, screenProps }: any) => {
        return {
            tabBarLabel: "首页",
            tabBarIcon: ({ focused, tintColor }: any) => (
                <Image
                    source={
                        focused ?
                            require("../../Assets/Icons/Tabs/home-active.png") :
                            require("../../Assets/Icons/Tabs/home-inactive.png")
                    }
                    style={[TabStyles.TabIcon, { tintColor: tintColor }]}
                />
            )
        };
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            BannerImagesList: [],
            MainPromotionBanner: null,
            CategoryPromotion: null,
            NearbyStores: []
        };
    }

    componentDidMount() {
        // TEMP navigate away!
        this.props.navigation.navigate("Product", { productId: 6 });

        // TEMP - Set temp data as state. Later change to API when it's available
        this.setState({
            BannerImagesList: BannerImages,
            MainPromotionBanner: MainPromotionItem,
            CategoryPromotion: CategoryPromotionItems,
            NearbyStores: NearbyStoreList
        });
    }

    render(): JSX.Element {
        return (
            <ScreenView>
                <ScreenBannerSlider images={this.state.BannerImagesList} />

                {/* Primary promotional banner */}
                <ScreenSection fullWidth={false}>
                    <ScreenSectionTitle title="秀无止境" />
                    {
                        this.state.MainPromotionBanner != null ?
                            <HomeMainPromotionBanner data={this.state.MainPromotionBanner} /> :
                            null
                    }
                </ScreenSection>

                {/* Secondary promotional section */}
                <ScreenSection fullWidth={false}>
                    {
                        this.state.CategoryPromotion != null ?
                            <HomeCategoryPromotion data={this.state.CategoryPromotion} /> :
                            null
                    }
                </ScreenSection>

                {/* Selected products preview section */}
                <ScreenSection fullWidth={false}>
                    <ScreenSectionTitle title="周边时尚店" />

                    {
                        this.state.NearbyStores != null ?
                            <HomeNearbyStoreList data={this.state.NearbyStores} /> :
                            null
                    }
                </ScreenSection>
            </ScreenView>
        );
    }
}
