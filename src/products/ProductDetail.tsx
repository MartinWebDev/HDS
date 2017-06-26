// React
import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ImageStyle,
    PixelRatio,
    Dimensions,
    LayoutChangeEvent,
    Modal
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

// Components required
import { ScreenView } from '../GlobalComponents/ScreenView';
import { ScreenSection } from '../GlobalComponents/ScreenSection';
import { ScreenSectionTitle } from '../GlobalComponents/ScreenSection/ScreenSectionTitle';
import { ScreenBannerSlider } from '../GlobalComponents/ScreenBannerSlider';

import { IMainPromotionItem } from '../home/HomeInterfaces';
import { IBannerImage } from '../GlobalComponents/GlobalInterfaces';
import { ProductReview } from './ProductDetail/ProductReview';
import { PuchaseProductModal } from './Purchase/PurchaseProductModal';
import { ProductDescriptionImage } from './ProductDetail/ProductDescriptionImage';

// Data
import { IProduct, Product } from '../Services/ClientData/Product';
import { IReview, Review } from '../Services/ClientData/Review';

import {
    IProductAttributeMappingsValue,
    IProductAttributeMappings
} from '../Services/ClientData/ProductAttributeMappings';

import { ISelectedProductAttributes } from '../Services/Interfaces/ISelectedProductAttributes';

// Services
import { IShoppingCartService, ShoppingCartService } from '../Services/ShoppingCartService';
import { ICustomerService, CustomerService } from '../Services/CustomerService';

// Component setup
interface Props {
    navigation: NavigationScreenProp<any, any>;
    productDetails: IProduct;
    productAttributeMappings: IProductAttributeMappings[];
    productReviews: IReview[];
    onToggleFavourite: () => void;
}

interface State {
    descriptionSectionWidth: number;
    purchaseModalVisible: boolean;
    buyNow: boolean;
}

// Component create
export class ProductDetail extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const { width } = Dimensions.get("screen");

        this.state = {
            descriptionSectionWidth: width,
            purchaseModalVisible: false,
            buyNow: false
        };
    }

    handleToggleFavourite() {
        this.props.onToggleFavourite();
    }

    dismissPurchaseModal() {
        this.setState({ purchaseModalVisible: false });
    }

    handlePurchase(productId: number,
        quantity: number,
        activeAttributes: ISelectedProductAttributes[],
        productAttributes: IProductAttributeMappings[],
        callback: () => void
    ): void {
        let custService: ICustomerService = new CustomerService();

        // Firstly we need the customer ID, then what that promise returns we can continue
        custService.GetCustomerId().then((custId: number) => {
            // Create the object for the cart service here so that if the above fails we save a tiny bit of time. 
            let cartService: IShoppingCartService = new ShoppingCartService();

            cartService.AddProductToCart(
                this.props.productDetails.Id,
                custId,
                quantity,
                activeAttributes,
                productAttributes,
                this.state.buyNow
            ).then((success) => {
                // Once the cart service has finished, we can fire the callback
                if (success) {
                    callback();
                }
                else {
                    alert("Oh shit!");
                }
            });
        });
    }

    render(): JSX.Element {
        let p: IProduct = this.props.productDetails;
        let attr: IProductAttributeMappings[] = this.props.productAttributeMappings || [];

        let r: JSX.Element[] = this.props.productReviews.map((review, index) => {
            return (
                <ProductReview key={`${review.CustomerName}_${index}`} review={review} />
            );
        });

        let banners = p.Banners.map((img) => {
            return {
                Id: img.PictureId,
                ImgUri: img.ImgUrl,
                LinkUri: null
            } as IBannerImage;
        });

        let descriptionImgs = this.props.productDetails.DescriptionImgs.map((img, index) => {
            return (
                <ProductDescriptionImage
                    key={index.toString()}
                    imageUri={img}
                    screenWidth={this.state.descriptionSectionWidth}
                />
            );
        });

        // Set which icon to use as the favourite, on or off (gold or white)
        let favouriteIcon: JSX.Element = p.IsCollect ?
            <Image
                style={{
                    width: PixelRatio.getPixelSizeForLayoutSize(8),
                    height: PixelRatio.getPixelSizeForLayoutSize(8)
                }}
                source={require("../../Assets/Icons/ProductDetails/favouriteOn.png")}
            /> :
            <Image
                style={{
                    width: PixelRatio.getPixelSizeForLayoutSize(8),
                    height: PixelRatio.getPixelSizeForLayoutSize(8)
                }}
                source={require("../../Assets/Icons/ProductDetails/favouriteOff.png")}
            />

        return (
            <View style={styles.container}>
                <Modal
                    animationType="fade"
                    visible={this.state.purchaseModalVisible}
                    transparent={true}
                    onRequestClose={() => { console.log("Modal closed"); }}
                >
                    <PuchaseProductModal
                        productId={p.Id}
                        productName={p.Name}
                        imgUri={p.ImgUrl}
                        productAttributes={attr}
                        unitPrice={p.Price}
                        close={this.dismissPurchaseModal.bind(this)}
                        purchase={this.handlePurchase.bind(this)}
                    />
                </Modal>

                <ScreenView>
                    {/* Banners */}
                    <ScreenBannerSlider images={banners} />

                    {/* Product View */}
                    <ScreenSection upperMargin={false} fullWidth={true} noBorder={true}>
                        <View key="MainInfo" style={styles.mainInfoWrapper}>
                            {/* Title */}
                            <Text style={styles.mainInfoName}>{p.Name}</Text>

                            {/* Short description */}
                            <Text style={styles.mainInfoDescription}>{p.ShortDescription}</Text>

                            {/* Price: Was/Now */}
                            <View style={styles.mainInfoPriceContainer}>
                                <Text style={styles.mainInfoWasPrice}>{p.OldPriceText}</Text>
                                <Text style={styles.mainInfoNowPrice}>{p.PriceText}</Text>
                            </View>

                            {/* Monthly sales */}
                            <Text>{`月销售${p.m_SalesCount}笔`}</Text>
                        </View>
                    </ScreenSection>

                    {/* Reviews */}
                    <ScreenSection fullWidth={false}>
                        <ScreenSectionTitle title="宝贝评价" />

                        <View key="Reviews">
                            {r.length == 0 ? <Text style={{ textAlign: "center" }}>暂无评论</Text> : r}

                            {
                                r.length == 0 ?
                                    null :
                                    <TouchableOpacity onPress={
                                        () => {
                                            // TODO: After we make the reviews page, make this button work
                                            this.props.navigation.navigate("TODO", { productId: p.Id })
                                        }
                                    }>
                                        <View style={styles.reviewsViewMoreArea}>
                                            <View style={styles.reviewsViewMoreButton}>
                                                <Text style={styles.reviewsViewMoreText}>查看全部评论</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                            }
                        </View>
                    </ScreenSection>

                    {/* Description area */}
                    <View style={{ marginTop: 12 }}>
                        {descriptionImgs}
                    </View>

                    {/* Product Parameters */}
                    <ScreenSection fullWidth={false}>
                        <ScreenSectionTitle title="产品参数" />

                        <View style={styles.attributeSection}>
                            {
                                p.ProductSpecificationAttributes.map((attr, index) => {
                                    return (
                                        <View
                                            key={`${attr.AttributeName}_${index}`}
                                            style={[
                                                styles.attributeRow,
                                                (
                                                    index == p.ProductAttributeMappings.length + 1 ?
                                                        { borderBottomWidth: 0 } as ViewStyle :
                                                        null
                                                )
                                            ]}
                                        >
                                            <Text style={styles.attributeTitle}>{attr.AttributeName}</Text>
                                            <Text style={styles.attributeValue}>
                                                {attr.AttributeValue}
                                            </Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </ScreenSection>

                    {/* Other help (aftermarket instructions) */}
                    <ScreenSection fullWidth={false}>
                        <ScreenSectionTitle title="售后说明" />

                        <Text>{p.OtherHelp}</Text>
                    </ScreenSection>

                    {/* Shop Info */}
                    <ScreenSection fullWidth={false}>
                        <ScreenSectionTitle title="没无极限" />

                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <View style={{ flexDirection: "row", marginBottom: 8 }}>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
                                    <Text style={{ marginRight: 4 }}>单品:</Text>
                                    <Text>{p.StoreProductCount}</Text>
                                </View>

                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
                                    <Text style={{ marginRight: 4 }}>粉丝:</Text>
                                    <Text>{p.CollectCount}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.reviewsViewMoreButton}
                                onPress={() => {
                                    // TODO: After we make the shop page, make this button work
                                    this.props.navigation.navigate("TODO")
                                }}
                            >
                                <Text style={styles.reviewsViewMoreText}>进入店铺</Text>
                            </TouchableOpacity>
                        </View>
                    </ScreenSection>
                </ScreenView>

                {/* Bottom controls - static on page */}
                <View key="BottomControls" style={styles.bottomControls}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <TouchableOpacity
                            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
                            onPress={() => {

                            }}
                        >
                            <Image
                                style={{
                                    width: PixelRatio.getPixelSizeForLayoutSize(8),
                                    height: PixelRatio.getPixelSizeForLayoutSize(8)
                                }}
                                source={require("../../Assets/Icons/ProductDetails/comment.png")}
                            />
                            <Text>消息</Text>
                        </TouchableOpacity>

                        <View style={{}}></View>

                        <TouchableOpacity
                            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
                            onPress={() => {

                            }}
                        >
                            <Image
                                style={{
                                    width: PixelRatio.getPixelSizeForLayoutSize(8),
                                    height: PixelRatio.getPixelSizeForLayoutSize(8)
                                }}
                                source={require("../../Assets/Icons/ProductDetails/viewShop.png")}
                            />
                            <Text>店铺</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
                            onPress={this.handleToggleFavourite.bind(this)}
                        >
                            {favouriteIcon}
                            <Text>收藏</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <TouchableOpacity style={styles.addToCart} onPress={
                            () => {
                                this.setState({ purchaseModalVisible: true, buyNow: false });
                            }
                        }>
                            <View>
                                <Text style={styles.purchaseText}>加入购物车</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buyNow} onPress={
                            () => {
                                this.setState({ purchaseModalVisible: true, buyNow: true });
                            }
                        }>
                            <View>
                                <Text style={styles.purchaseText}>立即购买</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // This section is for the outer wrapper
    container: {
        flex: 1
    } as ViewStyle,
    bottomControls: {
        height: PixelRatio.getPixelSizeForLayoutSize(20),
        flexDirection: "row",
        borderTopColor: "#CCC",
        borderTopWidth: 1,
        backgroundColor: "#FFF"
    } as ViewStyle,

    // Below here is the main styles for the product description
    mainInfoWrapper: {
        alignItems: "center"
    } as ViewStyle,
    mainInfoName: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(7.8),
        marginBottom: 16
    } as TextStyle,
    mainInfoDescription: {
        fontSize: PixelRatio.getPixelSizeForLayoutSize(5.2),
        textAlign: "center",
        marginBottom: 16
    } as TextStyle,
    mainInfoPriceContainer: {
        flexDirection: "row",
        marginBottom: 16
    } as ViewStyle,
    mainInfoWasPrice: {
        textDecorationLine: "line-through",
        color: "#CCC",
        fontSize: PixelRatio.getPixelSizeForLayoutSize(5),
        flex: 1,
        textAlign: "right",
        justifyContent: "center",
        paddingRight: 5
    } as TextStyle,
    mainInfoNowPrice: {
        color: "#ff0006",
        fontSize: PixelRatio.getPixelSizeForLayoutSize(6.4),
        flex: 1,
        textAlign: "left",
        justifyContent: "center",
        paddingLeft: 5
    } as TextStyle,
    mainInfoMonthlySales: {

    } as TextStyle,
    reviewsViewMoreArea: {
        alignItems: "center"
    } as ViewStyle,
    reviewsViewMoreButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderColor: "#FF0006",
        borderWidth: 1,
        borderRadius: 4
    } as ViewStyle,
    reviewsViewMoreText: {
        color: "#FF0006"
    } as TextStyle,
    attributeSection: {

    } as ViewStyle,
    attributeRow: {
        flexDirection: "row",
        padding: 12,
        borderBottomColor: "#CCC",
        borderBottomWidth: 1
    } as ViewStyle,
    attributeTitle: {
        color: "#CCC",
        flex: 1
    } as TextStyle,
    attributeValue: {
        flex: 1
    } as TextStyle,

    // These are for the bottom controls
    bottomControlsIconArea: {
        flex: 1
    } as ViewStyle,
    addToCart: {
        flex: 1,
        backgroundColor: "#f8afb1",
        justifyContent: "center",
        alignItems: "center"
    } as ViewStyle,
    buyNow: {
        flex: 1,
        backgroundColor: "#ff0006",
        justifyContent: "center",
        alignItems: "center"
    } as ViewStyle,
    purchaseText: {
        color: "#FFF"
    } as TextStyle
});
