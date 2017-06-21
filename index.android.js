import React, { Component } from 'react';

import {
    AppRegistry
} from 'react-native';

import { AppTabs } from './build/AppTabs';

// TEMP - Ignore warning about deprecated type. 
// This issue will be fixed in react-navigation beta10 when that gets released
console.ignoredYellowBox = ['Warning: View.propTypes', 'Warning: BackAndroid', 'Remote debugger'];

const AppBootstrap = () => <AppTabs />;

AppRegistry.registerComponent('HDS', () => AppBootstrap);
