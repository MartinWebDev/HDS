import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    ViewStyle,
    TextStyle,
    ImageStyle,
    TouchableHighlight
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';

import { TabStyles } from '../Styles/TabStyles';

import { ScreenView } from '../GlobalComponents/ScreenView';

import { WriteInput } from './addChildren/WriteInput';
import { WriteAdress } from './addChildren/WriteAdress';

// Custom typing definition file for Baidu Maps
import {
    Geolocation,
    CurrentPositionData
} from 'react-native-baidu-map';

// Child components for camera capture area and photo preview
import { CameraCapture } from '../camera/CameraCapture';

interface State {
    // EXAMPLES for Baidu Map address finder
    lat: number;
    long: number;
    address: string;
    json: string;
    city: string;
    country: string;
}

interface Props {
    navigation: NavigationScreenProp<any, any>
}

export class AddTab extends Component<Props, State> {
    static navigationOptions: any = ({ navigation, screenProps }: any) => {
        return {
            tabBarLabel: "美丽圈",
            headerTitle: '写日记', //设置标题内容  
            headerTitleStyle: {
                fontSize: 14
            },
            headerRight: (
                <TouchableHighlight
                    underlayColor="#d9d9d9"
                    activeOpacity={0.2}
                    onPress={() => {
                        console.log('发送!');
                    }}
                    style={WriteStyles.headerTouch}
                >
                    <Text style={WriteStyles.headerSubmit}>
                        发送
                    </Text>
                </TouchableHighlight>
            ),
            tabBarIcon: ({ focused, tintColor }: any) => (
                <Image
                    source={
                        focused ?
                            require("../../Assets/Icons/Tabs/add-active.png") :
                            require("../../Assets/Icons/Tabs/add-inactive.png")
                    }
                    style={[TabStyles.TabIcon, { tintColor: tintColor }]}
                />
            )
        };
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            lat: 0,
            long: 0,
            address: "",
            json: "",
            city: "",
            country: ""
        };
    }

    componentDidMount(): void {
        Geolocation.getCurrentPosition().then((data: CurrentPositionData) => {
            this.setState({
                json: JSON.stringify(data),
                lat: data.latitude,
                long: data.longitude,
                address: data.address,
                city: data.city,
                country: data.country
            });
        });
    }

    render(): JSX.Element {
        return (
            <ScreenView style={WriteStyles.writeVew}>
                <View style={{ height: 170 }}>
                    <WriteInput />
                </View>

                <View>
                    <WriteAdress />
                </View>

                <WriteInput />

                {/* Photo capture area */}
                <CameraCapture wrapperStyle={{} as ViewStyle} />

                <Text>Latitude: {this.state.lat}</Text>
                <Text>Longitude: {this.state.long}</Text>
                <Text>Address: {this.state.address}</Text>
                <Text>City: {this.state.city}</Text>
                <Text>Country: {this.state.country}</Text>
            </ScreenView>
        );
    }
}

const WriteStyles = StyleSheet.create({
    headerSubmit: {
        color: "#9d9d9d",
        fontSize: 14
    } as TextStyle,
    headerTouch: {
        marginRight: 10,
        borderRadius: 100,
    } as ViewStyle,
    writeVew: {
        flex: 1,
        backgroundColor: "#fff"
    } as ViewStyle
});