// React
import React, { Component } from 'react';

import {
    View,
    Text,
    Image,
    ViewStatic,
    ViewStyle,
    TextStyle,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
    ImageStyle,
    Dimensions
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

// Components required
import { ScreenView } from '../GlobalComponents/ScreenView';
import { ICategoryService, CategoryService } from '../Services/CategoryService';
import { ICategoryTwoList, CategoryTwoList } from '../Services/ClientData/categoryList/CategoryTwoList';
//import { } from './CategoryDetail';

// Component setup
interface Props {
    navigation: NavigationScreenProp<any, any>;
    products: any[]; //TODO: Create interface for products list array
}

interface State {
    categoryList: ICategoryTwoList[];
}

//screen width;
var WINDOW_WIDTH = Dimensions.get('window').width;

// Component create
export class CategoryDetail extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            categoryList: []
        };
    }

    componentDidMount() {
        let catServ: ICategoryService = new CategoryService();

        catServ.GetCategoriesByParentId(this.props.navigation.state.params.catId).then((response: ICategoryTwoList[]): void => {
            this.setState({
                categoryList: response.map((cat: ICategoryTwoList) => {
                    return {
                        Id: cat.Id,
                        Name: cat.Name,
                        ImgUrl: cat.ImgUrl,
                        PriceText: cat.PriceText,
                        m_SalesCount: cat.m_SalesCount
                    } as ICategoryTwoList   //  I recommend adding this bit in whenever you create an anonymous object
                    //                          The reason I suggest this is because it highlights mistakes. For example
                    //                          in this object ImgUri should be ImgUrl. On our own we might take a long
                    //                          time to see that mistake and figure out why the image did not display. 
                    //                          but with "as ICategoryTwoList" here, typescript can then tell us that it
                    //                          is wrong even before we save the file. 
                })
            });
        });
    }

    render(): JSX.Element {
        return (
            <ScreenView style={categoryListStyles.ScreenscollView}>
                <View style={categoryListStyles.categoryView}>
                    {
                        this.state.categoryList.map((product: ICategoryTwoList): JSX.Element => {
                            return (
                                <View key={product.Id} style={{ width: (WINDOW_WIDTH / 2), justifyContent: 'center', paddingTop: 12 }}>
                                    <TouchableOpacity activeOpacity={0.1} onPress={
                                        () => { this.props.navigation.navigate("Product", { productId: product.Id }) }
                                    }>
                                        <Image source={{ uri: product.ImgUrl }} style={categoryListStyles.imageStyle} />
                                    </TouchableOpacity>

                                    <Text>{product.Name}</Text>
                                </View>
                            );
                        })
                    }
                </View>
            </ScreenView>
        );
    }
}

const categoryListStyles = StyleSheet.create({
    ScreenscollView: {
        backgroundColor: "#fff",
        flex: 1
    } as ViewStyle,
    categoryView: {
        backgroundColor: "#fff",
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1
    } as ViewStyle,
    imageStyle: {
        alignSelf: 'center',
        width: 173,
        borderRadius: 10,
        height: 209
    } as ImageStyle
});
