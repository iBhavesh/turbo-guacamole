import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MainNavigator from './MainNavigator';
import {isIOS} from 'react-native-elements/dist/helpers';
import colors from '../constants/colors';
import {Icon} from 'react-native-elements';
import MenuScreen from '../screens/MenuScreen';
import UsersNavigator from './UsersNavigator';
import FileViewerScreen from '../screens/FileViewerScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: !isIOS ? colors.white : colors.primary,
        headerStyle: !isIOS ? {backgroundColor: colors.primary} : {},
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: colors.secondaryDark,
        tabBarIcon: () => null,
        tabBarStyle: {
          backgroundColor: isIOS ? 'white' : colors.primary,
        },
      }}>
      <Tab.Screen
        name="DashboardTab"
        component={MainNavigator}
        options={{
          headerShown: false,
          title: 'Dashboard',
          tabBarIcon: props => (
            <Icon name="ios-grid" type="ionicon" color={props.color} />
          ),
        }}
      />
      <Tab.Screen
        name="UsersTab"
        component={UsersNavigator}
        options={{
          headerShown: false,
          title: 'Users',
          tabBarIcon: props => (
            <Icon name="ios-person" type="ionicon" color={props.color} />
          ),
        }}
      />
      <Tab.Screen
        name="FilesTab"
        component={FileViewerScreen}
        options={{
          title: 'File',
          tabBarIcon: props => (
            <Icon name="file" type="material-community" color={props.color} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: props => (
            <Icon name="ios-menu" type="ionicon" color={props.color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
