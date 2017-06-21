import React, { Component } from 'react';

import {
    AppRegistry
} from 'react-native';

import { AppTabs } from './build/AppTabs';

const AppBootstrap = () => <AppTabs />;
//AppRegistry模块则是用来告知React Native哪一个组件被注册为整个应用的根容器
AppRegistry.registerComponent('HDS', () => AppBootstrap);
