import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import UsersScreen from '../screens/UsersScreen';
import DashboardScreen from '../screens/DashboardScreen';
import colors from '../constants/colors';
import {isIOS} from 'react-native-elements/dist/helpers';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {signout} from '../store/reducers/authSlice';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleSignout = () => {
    dispatch(signout());
  };

  let image;
  if (!user || !user.profile_picture) {
    image = require('../assets/images/profile_placeholder.png');
  } else {
    image = {usri: user.profile_picture};
  }

  return (
    <DrawerContentScrollView
      // style={{flex: 1}}
      contentContainerStyle={styles.drawerContentContainer}
      {...props}>
      <View>
        <View style={styles.headerContainer}>
          <Image style={styles.headerImage} source={image} />
          <View>
            <Text style={styles.headerTitle}>{user.name}</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </View>
      <Button
        icon={{type: 'ionicon', name: 'ios-exit'}}
        iconPosition="left"
        title="Logout"
        containerStyle={styles.buttonContainer}
        onPress={() => {
          handleSignout();
        }}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTintColor: !isIOS ? colors.white : colors.primary,
        headerStyle: !isIOS ? {backgroundColor: colors.primary} : {},
      }}>
      <Drawer.Screen
        options={{
          title: 'Dashboard',
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
        name="Users"
        component={UsersScreen}
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
