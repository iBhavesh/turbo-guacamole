import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useLayoutEffect} from 'react';
import {FlatList} from 'react-native';
import {Divider, Text} from 'react-native-elements';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';
import AppHeaderButton from '../components/AppHeaderButtons';

import UserListItem from '../components/UserListItem';

const UsersScreen = ({navigation}) => {
  const users = useSelector(state => state.user.users);

  useEffect(() => {
    AsyncStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
          <Item
            iconName="ios-add-outline"
            iconSize={30}
            onPress={() => {
              navigation.navigate('UserEdit');
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  if (users.length === 0) {
    return <Text h3>No users found</Text>;
  }

  return (
    <FlatList
      data={users}
      renderItem={({item}) => <UserListItem user={item} />}
      ItemSeparatorComponent={() => (
        <Divider orientation="horizontal" width={1} />
      )}
    />
  );
};

export default UsersScreen;
