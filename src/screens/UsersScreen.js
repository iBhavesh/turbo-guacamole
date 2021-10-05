import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button, Divider, Text} from 'react-native-elements';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';
import AppHeaderButton from '../components/AppHeaderButtons';

import UserListItem from '../components/UserListItem';
import BottomSheet from '../components/BottomSheet';

const UsersScreen = ({navigation}) => {
  const users = useSelector(state => state.user.users);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.setItem('userList', JSON.stringify(users));
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

  const handleSaveUsers = () => {
    setBottomSheetVisible(true);
    // setModalVisible(true);
  };

  const handleBottomSheetClose = () => {
    setBottomSheetVisible(false);
  };

  if (users.length === 0) {
    return <Text h3>No users found</Text>;
  }

  return (
    <View style={styles.container}>
      <BottomSheet
        isVisible={bottomSheetVisible}
        onClose={handleBottomSheetClose}
      />
      <FlatList
        data={users}
        renderItem={({item}) => <UserListItem user={item} />}
        ItemSeparatorComponent={() => (
          <Divider orientation="horizontal" width={1} />
        )}
      />
      <View style={styles.buttonContainer}>
        <Button
          containerStyle={styles.buttonStyle}
          type="solid"
          title="Save Users"
          onPress={handleSaveUsers}
        />
      </View>
    </View>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  buttonStyle: {
    width: '90%',
    borderRadius: 8,
  },
  container: {
    flex: 1,
  },
});
