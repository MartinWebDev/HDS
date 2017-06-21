import React, { Component } from 'react';

import {
    View, 
    Text, 
    Image, 
    TouchableHighlight, 
    StyleSheet, 
    ViewStyle, 
    TextStyle,
    ImageStyle
} from 'react-native';

interface Props { }

interface State { }

export class WriteAdress extends Component<Props, State> {
    constructor (props: any) {
        super(props);

        this.state = { searchValue: "" };
    }
      render (): JSX.Element {
        return (
            <View style={headerStyles.AdressBox}>
                <Image 
                source={require("../../../Assets/Icons/WriteDay/adressnine.png")} 
                style={headerStyles.Adressicon}
                />
                <Text style={headerStyles.adressTest}>你在哪里？</Text>
             </View>
             
        );
    }
}
/*const GeolocationExample = React.createClass({

  getInitialState: function() {
    return {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
  },

  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.setState({initialPosition}),
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
      this.setState({lastPosition})
    })
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  render: function() {
    return (
      <View>
        <Text>Initial position: 
          {JSON.stringify(this.state.initialPosition)}
        </Text>
        <Text>Current position: 
          {JSON.stringify(this.state.lastPosition)}
        </Text>
      </View>
         )
  }
})*/

const headerStyles = StyleSheet.create({
    AdressBox: {
        height:30,
        alignItems:'center',
        flexDirection: "row", 
        marginLeft:10,
        
    } as ViewStyle,
    Adressicon:{
        height:16,
        width:12,
        marginLeft:4,
        marginRight:6,
        position:"absolute",
        left:4,
        zIndex:4
    }as ImageStyle,
    adressTest:{
        fontSize:14,
        backgroundColor:"#f5f5f5",
        color:"#969696",
        paddingLeft:26,
        paddingTop:6,
        paddingBottom:6,
        paddingRight:4,
        alignItems:'center',
        borderRadius:40,
    }as TextStyle
});