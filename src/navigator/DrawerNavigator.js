import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import AccountScreen from '../screens/AccountScreen';
import DashboardScreen from '../screens/DashboardScreen';
import colors from '../constants/colors';
import {isIOS} from 'react-native-elements/dist/helpers';
import {Image, Linking, SafeAreaView, Text, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView
      style={{flex: 1}}
      contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}
      {...props}>
      <View>
        <View
          style={{
            backgroundColor: colors.secondary,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            height: 200,
          }}>
          <View>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderColor: 'white',
                borderWidth: 1,
              }}
              source={{
                uri: 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
              }}
            />
          </View>
          <View>
            <Text style={{fontSize: 18, color: 'white'}}>Bhavesh Shama</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </View>
      <Button
        icon={{type: 'ionicon', name: 'ios-exit'}}
        iconPosition="left"
        title="Logout"
        containerStyle={{padding: 10}}
      />
    </DrawerContentScrollView>
  );

  // return (
  //   <View style={{flex: 1}}>
  //     <View>
  //       <Image
  //         source={{
  //           uri: 'https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
  //         }}
  //       />
  //     </View>
  //   </View>
  // );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        options={{
          title: 'Dashboard',
          headerTintColor: !isIOS ? colors.white : colors.primary,
          headerStyle: !isIOS ? {backgroundColor: colors.primary} : {},
          drawerIcon: () => <Icon type="ionicon" name="ios-grid" />,
        }}
        name="DashboardScreen"
        component={DashboardScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => <Icon type="ionicon" name="ios-person" />,
        }}
        name="Account"
        component={AccountScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
