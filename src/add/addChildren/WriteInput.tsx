import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View, 
    TouchableHighlight,
    ViewStyle, 
    TextInput,
    TextStyle
} from 'react-native';

interface Props { }
interface State {
    WriteValue: string;
}
export class WriteInput extends Component<Props,State>{
    constructor (props: any) {
        super(props);
        this.state = { WriteValue: "" };
    }
    render():JSX.Element{
        return (
            <View >
                <TextInput underlineColorAndroid="transparent"
                    placeholder="分享你的美" 
                    placeholderTextColor="#c7c7c7"
                     value={this.state.WriteValue}
                     onChangeText={
                        (text) => {
                             this.setState({WriteValue: text });
                        }
                     } 
                     multiline = {true}
                     style={WriteInputStyle.WriteStyle}
                />
            </View>
        )
    }
}

const WriteInputStyle=StyleSheet.create({
    WriteStyle:{
       height:170,
       margin: 10,
       padding:0,
       textAlignVertical:'top',
       fontSize: 14,
    }as TextStyle, 
})