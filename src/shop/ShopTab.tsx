// Import all modules needed from react and react libraries
import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    ViewStyle,
    ImageStyle,
    LayoutChangeEvent,
    TouchableOpacity
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

// Import all styles required for this tab
import { TabStyles } from '../Styles/TabStyles';

//Import required interfaces for data on this tab
import {
    ICategoryThumb,
    IHotProductThumb
} from './ShopInterfaces';

import {
    IBannerImage
} from '../GlobalComponents/GlobalInterfaces';

// Import child components for this tab
import { ScreenView } from '../GlobalComponents/ScreenView';
import { ScreenSection } from '../GlobalComponents/ScreenSection';
import { ScreenSectionTitle } from '../GlobalComponents/ScreenSection/ScreenSectionTitle';
import { ScreenBannerSlider } from '../GlobalComponents/ScreenBannerSlider';
import { HorizontalSlider } from '../GlobalComponents/HorizontalSlider';
import { InlineErrorMessage } from '../GlobalComponents/ErrorMessage';

import { CategoryThumbList } from './CategoryThumbs';
import { HotProductThumb } from '../products/HotProductThumb';
import { FashionProductThumb } from '../products/FashionProductThumb';

// TEMP - Import fake data, this will later be replaced by API Services
import { BannerImages2 } from './TempData';

// Import data and services
import { ICategory, Category } from '../Services/ClientData/Category';
import { ICategoryService, CategoryService } from '../Services/CategoryService';

import { IProduct, Product } from '../Services/ClientData/Product';
import { IProductService, ProductService } from '../Services/ProductService';
import { IHotProductSummary } from '../Services/ClientData/HotProductSummary';
import { IFashionProductSummary } from '../Services/ClientData/FashionProductSummary';

interface State {
    BannerImagesList: IBannerImage[];
    CategoryThumbList: ICategoryThumb[];
    CategoryFakeThumbs: number[];
    HotProducts: IHotProductThumb[];
    FashionProducts: IFashionProductSummary[];

    CouldNotGetCategories: boolean;
    CouldNotGetHotProducts: boolean;
    CouldNotGetFashionProducts: boolean;
}

interface Props {
    navigation: NavigationScreenProp<any, any>
}

export class ShopTab extends Component<Props, State> {
    // TODO: What TS type should this be?
    static navigationOptions: any = ({ navigation, screenProps }: any) => {
        return {
            tabBarLabel: "商城",
            tabBarIcon: ({ focused, tintColor }: any) => (
                <Image
                    source={
                        focused ?
                            require("../../Assets/Icons/Tabs/shop-active.png") :
                            require("../../Assets/Icons/Tabs/shop-inactive.png")
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
            CategoryThumbList: [],
            CategoryFakeThumbs: [],
            HotProducts: [],
            FashionProducts: [],
            CouldNotGetCategories: false,
            CouldNotGetHotProducts: false,
            CouldNotGetFashionProducts: false
        };
    }

    getCategoryList(): void {
        // Here we will fetch the list of categories from the server, then map that to a list of thumbnails.
        // Set the list into the state, which will then re-render the view allowing us to see the list. 
        let catServ: ICategoryService = new CategoryService();

        catServ.GetCategories().then((response: ICategory[]) => {
            let catThumbs: ICategoryThumb[] = response.map((cat: ICategory) => {
                return {
                    Id: cat.Id,
                    ImgUri: cat.ImgUrl,
                    LinkUri: "",
                    LinkText: cat.Name
                } as ICategoryThumb
            });

            this.setState({
                CategoryThumbList: catThumbs
            });
        }).catch((error: any) => {
            //TODO Add better error handling with nofications to the user
            console.error(error);
            this.setState({ CouldNotGetCategories: true });
        });
    }

    getHotProductList(): void {
        // Fetch the list of hot products for the shop tab
        let prodServ: IProductService = new ProductService();

        prodServ.GetHotProducts().then((response: IHotProductSummary[]) => {
            let prodThumbs: IHotProductThumb[] = response.map((prod: IHotProductSummary) => {
                return {
                    Id: prod.Id,
                    ImgUri: prod.ImgUrl,
                    Price: prod.Price,
                    PriceText: prod.PriceText
                } as IHotProductThumb;
            });

            this.setState({
                HotProducts: prodThumbs
            });
        }).catch((error: any) => {
            //TODO Add better error handling with nofications to the user
            console.error(error);
            this.setState({ CouldNotGetHotProducts: true });
        });
    }

    getFashionProducts(): void {
        let prodServ: IProductService = new ProductService();

        prodServ.GetFashionProducts().then((response: IFashionProductSummary[]) => {
            this.setState({
                FashionProducts: response
            });
        }).catch((error: any) => {
            this.setState({ CouldNotGetFashionProducts: true });
        });
    }

    componentDidMount() {
        this.getCategoryList();
        this.getHotProductList();
        this.getFashionProducts();

        this.setState({
            BannerImagesList: BannerImages2
        });
    }

    render(): JSX.Element {
        return (
            <ScreenView>
                <ScreenBannerSlider images={this.state.BannerImagesList} />

                {/* Category thumbnail view */}
                <ScreenSection fullWidth={true}>
                    <View style={{ flex: 1 }} onLayout={
                        (event: LayoutChangeEvent) => {
                            // Calculate number of fake items which need generating on the last row to keep 
                            // the style consistent. 
                            const minItemWidth = styleConsts.categoryThumb.width + (styleConsts.categoryThumb.margin * 2);
                            var width = Math.floor(event.nativeEvent.layout.width - (styleConsts.wrapperStyle.margin * 2));

                            var itemsScreenCanDisplay = Math.floor(width / minItemWidth);

                            var tmpNumItems = this.state.CategoryThumbList.length % itemsScreenCanDisplay;
                            var tmpFakesNeeded = tmpNumItems > 0 ? itemsScreenCanDisplay - tmpNumItems : 0;

                            var tmpArray: number[] = [];

                            for (var i = 0; i < tmpFakesNeeded; i++) {
                                tmpArray.push(i);
                            }

                            this.setState({ CategoryFakeThumbs: tmpArray });
                        }
                    }>
                        <CategoryThumbList
                            catThumbs={this.state.CategoryThumbList}
                            fakeThumbs={this.state.CategoryFakeThumbs}
                            thumbStyles={categoryThumbStyles}
                            navigation={this.props.navigation}
                        />
                    </View>

                    <TouchableOpacity onPress={
                        () => {
                            // Reset error message then reload
                            this.setState({ CouldNotGetCategories: false }, () => { this.getCategoryList(); });
                        }
                    }>
                        <InlineErrorMessage message="无法加载类别。 触摸重新加载" visible={this.state.CouldNotGetCategories} />
                    </TouchableOpacity>
                </ScreenSection>

                {/* Hot products thumbnail slider */}
                <ScreenSection fullWidth={false}>
                    <ScreenSectionTitle title="人气秒杀" />

                    <View style={this.state.CouldNotGetHotProducts ? { height: 0 } : { height: null }}>
                        <HorizontalSlider style={{ height: 162 } as ViewStyle}>
                            {
                                this.state.HotProducts.map((product: IHotProductThumb): JSX.Element => {
                                    return (
                                        <HotProductThumb navigation={this.props.navigation} key={product.Id} productDetails={product} />
                                    );
                                })
                            }
                        </HorizontalSlider>
                    </View>

                    <TouchableOpacity onPress={
                        () => {
                            // Reset error message then reload
                            this.setState({ CouldNotGetHotProducts: false }, () => { this.getHotProductList(); });
                        }
                    }>
                        <InlineErrorMessage message="无法加载热销产品。 触摸重新加载" visible={this.state.CouldNotGetHotProducts} />
                    </TouchableOpacity>
                </ScreenSection>

                {/* Fashion products slider */}
                <ScreenSection fullWidth={false}>
                    <ScreenSectionTitle title="潮流解析" />

                    <View style={this.state.CouldNotGetFashionProducts ? { height: 0 } : { height: null }}>
                        <HorizontalSlider style={{}}>
                            {
                                this.state.FashionProducts.map((product: IFashionProductSummary): JSX.Element => {
                                    return (
                                        <FashionProductThumb key={product.Id} productDetails={product} />
                                    );
                                })
                            }
                        </HorizontalSlider>
                    </View>

                    <TouchableOpacity onPress={
                        () => {
                            this.setState({ CouldNotGetFashionProducts: false }, () => { this.getFashionProducts() });
                        }
                    }>
                        <InlineErrorMessage message="无法加载热销产品。 触摸重新加载" visible={this.state.CouldNotGetFashionProducts} />
                    </TouchableOpacity>
                </ScreenSection>
            </ScreenView>
        );
    }
}

const styleConsts = {
    categoryThumb: {
        height: 90,
        width: 70,
        imgHeight: 60,
        imgWidth: 60,
        margin: 4,
        padding: 5
    },
    wrapperStyle: {
        margin: 0 // This is the margin around the outside of the wrapper, this is needed so it can be subtracted from the device width
    }
};

const categoryThumbStyles = StyleSheet.create({
    categoryThumb: {
        height: styleConsts.categoryThumb.height,
        width: styleConsts.categoryThumb.width,
        margin: styleConsts.categoryThumb.margin,
        padding: styleConsts.categoryThumb.padding
    } as ViewStyle,
    categoryThumbImage: {
        height: styleConsts.categoryThumb.imgHeight,
        width: styleConsts.categoryThumb.imgWidth
    } as ImageStyle,
    categoryThumbFake: {
        height: styleConsts.categoryThumb.height,
        width: styleConsts.categoryThumb.width,
        margin: styleConsts.categoryThumb.margin,
        padding: styleConsts.categoryThumb.padding
    } as ViewStyle
});