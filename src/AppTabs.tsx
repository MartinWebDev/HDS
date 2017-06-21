/**
 * To build and run this typescript project you need 3 command prompts and run these commands in turn on each one
 *      1. npm run tsc
 *      2. npm start
 *      3. react-native run-android
 */

/**
 * TODO: Martin tasks/ideas
 *  - Work out why typescript won't recognise type definition files in a custom directory.
 *      Then move baidumap.d.ts out of node_module.
 *  - Enable TSLint to check TypeScript for rules I already picked.
 *      Once that works, enable it on watch every time a TS or TSX file is saved.
 *  - Investigate into possibility of CruiseControl (or similar) CI environment to automatically generate new APKs
 *  - Investigate idea of having a mini app to automatically generate a new react-native app, add typescript support, 
 *      add navigation system, and set up full template for each new project automatically.
 *      Would save time on future projects. 
 */

// Imports from react and related libraries
import React from 'react';

import { View, Text } from 'react-native';

import {
    TabNavigator,
    StackNavigator,
    NavigationContainer,
    HeaderProps,
    NavigationScreenOptions
} from 'react-navigation';

// Import tabs and other screens
import { HomeTab } from './home/HomeTab';
import { ShopTab } from './shop/ShopTab';
import { AddTab } from './add/AddTab';
import { BasketTab } from './basket/BasketTab';
import { AccountTab } from './account/AccountTab';

import { ProductDetailScreen } from './products/ProductDetailScreen';
import { CategoryDetailScreen } from './category/CategoryDetailScreen';

// Imports from styles
import { TabStyles, TabStylesObj } from './Styles/TabStyles';

// Import child components required
import { HomeScreenHeader } from './headers/HomeScreenHeader';
import { ProductDetailHeader } from './headers/ProductDetailHeader';
import { AddTabHeader } from './headers/AddTabHeader';

// TEMP!!!
import { MapTestScreen } from './test/MapTest';

// Setup primary tab navigation system to later be injected into the stack navigator
const HomeScreenTabs: NavigationContainer = TabNavigator(
    {
        Home: { screen: HomeTab, navigationOptions: { header: <HomeScreenHeader /> } },
        Shop: { screen: ShopTab, navigationOptions: { header: <HomeScreenHeader /> } },
        Add: { screen: AddTab },
        Basket: { screen: BasketTab, navigationOptions: { header: null } },
        Account: { screen: AccountTab, navigationOptions: { header: null } }
    },
    {
        tabBarOptions: {
            activeTintColor: TabStylesObj.activeTintColor,
            inactiveTintColor: TabStylesObj.inactiveTintColor,
            showIcon: true,
            showLabel: true,
            style: TabStyles.TabBar,
            indicatorStyle: TabStyles.TabIndicator
        },
        tabBarPosition: TabStylesObj.tabBarPosition,
        swipeEnabled: false,
        animationEnabled: false
    }
);

export const AppTabs: NavigationContainer = StackNavigator(
    {
        Home: { screen: HomeScreenTabs },
        Category: { screen: CategoryDetailScreen },
        Product: {
            screen: ProductDetailScreen,
            navigationOptions: ({ navigation }: any): NavigationScreenOptions => ({
                header: <ProductDetailHeader navigation={navigation} />
            })
        },
        Map: { screen: MapTestScreen }
    },
    {
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: '#9d9d9d',
            showIcon: true,
            headerStyle: TabStyles.HeaderStack,
            swipeEnabled: false,
            animationEnabled: false,
        },
        mode: 'card',
    }
);
