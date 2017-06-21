import { 
    StyleSheet, 
    ViewStyle, 
    ImageStyle
} from 'react-native';

export const TabStylesObj = {
    activeTintColor: "#ff0006", 
    inactiveTintColor: "#303030", 
    tabBarPosition: "bottom" as "bottom"|"top",
    headerTintColor:'#9d9d9d',          
};

export const TabStyles = StyleSheet.create({
    TabIcon: {
        width: 25, 
        height: 25
    } as ImageStyle, 
    TabBar: {
        backgroundColor: "#FFF", 
        height: 64, 
        borderTopWidth: 1, 
        borderTopColor: "#666"
    } as ViewStyle, 
    TabIndicator: {
        backgroundColor: TabStylesObj.activeTintColor, 
        height: 0
    } as ViewStyle,
    HeaderStack: {
        height: 40,
    } as ViewStyle
});
