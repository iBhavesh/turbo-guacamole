import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import AccountScreen from '../screens/AccountScreen';
import DashboardScreen from '../screens/DashboardScreen';
import colors from '../constants/colors';
import {isIOS} from 'react-native-elements/dist/helpers';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView
      // style={{flex: 1}}
      contentContainerStyle={styles.drawerContentContainer}
      {...props}>
      <View>
        <View style={styles.headerContainer}>
          <Image
            style={styles.headerImage}
            source={{
              uri: 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
            }}
          />
          <View>
            <Text style={styles.headerTitle}>Bhavesh Shama</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </View>
      <Button
        icon={{type: 'ionicon', name: 'ios-exit'}}
        iconPosition="left"
        title="Logout"
        containerStyle={styles.buttonContainer}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        options={{
          title: 'Dashboard',
          headerTintColor: !isIOS ? colors.white : colors.primary,
          headerStyle: !isIOS ? {backgroundColor: colors.primary} : {},
          drawerIcon: ({color}) => (
            <Icon color={color} type="ionicon" name="ios-grid" />
          ),
        }}
        name="DashboardScreen"
        component={DashboardScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color}) => (
            <Icon color={color} type="ionicon" name="ios-person" />
          ),
        }}
        name="Account"
        component={AccountScreen}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    borderWidth: 1,
  },
  drawerContentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 200,
  },
  headerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
  },
});

export default DrawerNavigator;
