import React, { Component } from 'react';

import {
    View, 
    TextInput, 
    Image, 
    TouchableHighlight, 
    StyleSheet, 
    ViewStyle, 
    TextStyle
} from 'react-native';

interface Props { }
interface State {
    searchValue: string;
}

export class SearchBar extends Component<Props, State> {
    constructor (props: any) {
        super(props);

        this.state = { searchValue: "" };
    }

    render (): JSX.Element {
        return (
            <View style={searchStyles.searchBarContainer}>
                <View style={{ flex: 1 }}>
                    <TextInput underlineColorAndroid="transparent" 
                        key="txtSearch" 
                        value={this.state.searchValue} 
                        placeholder="大师一下" 
                        style={searchStyles.searchTextBox} 
                        onChangeText={
                            (text) => {
                                this.setState({ searchValue: text });
                            }
                        } 
                    />
                </View>

                <View style={{ width: 20 }}>
                    <TouchableHighlight onPress={
                        () => {
                            this.setState({ searchValue: "" });
                            //this.refs.txtSearch.focus();
                        }
                    }>
                        <Image source={require("../../../Assets/Icons/SearchBar/Cancel-Filled-16.png")} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const searchStyles = StyleSheet.create({
    searchBarContainer: {
        margin: 5, 
        backgroundColor: "#DDD", 
        borderWidth: 1, 
        borderColor: "#CCC", 
        borderRadius: 4, 
        flexDirection: "row", 
        alignItems: "center", 
        flex: 1
    } as ViewStyle, 
    searchTextBox: {
        margin: 0, 
        padding: 0, 
        marginLeft: 4, 
        marginRight: 4
    } as TextStyle
});
