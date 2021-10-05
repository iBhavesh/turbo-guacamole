import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Linking, Pressable, StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../constants/colors';
import {addSelectedUser, removeSelectedUser} from '../store/reducers/userSlice';

const UserListItem = props => {
  const navigation = useNavigation();
  const [isSelected, setIsSelected] = useState(false);
  const selectedUsers = useSelector(state => state.user.selectedUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = selectedUsers.find(value => value.id === props.user.id);
    if (user) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedUsers, setIsSelected, props.user.id]);

  const goToUserEdit = () => {
    navigation.navigate('UserDetail', props.user);
  };

  const handlePhoneClick = () => {
    Linking.openURL('tel:' + props.user.phone);
  };

  const handleLocationClick = () => {
    Linking.openURL(`geo: 0,0?q=${props.user.address}`);
  };

  const handleAddClick = params => {
    if (!isSelected) {
      dispatch(addSelectedUser(props.user));
    } else {
      dispatch(removeSelectedUser(props.user.id));
    }
    setIsSelected(prev => !prev);
  };

  let imageSource = '';
  if (props.user.image) {
    imageSource = {uri: props.user.image};
  } else {
    imageSource = require('../assets/images/profile_placeholder.png');
  }

  return (
    <Pressable
      style={styles.container}
      android_ripple={{color: 'gray'}}
      onPress={goToUserEdit}>
      <View style={styles.leftContainer}>
        <Image style={styles.imageContainer} source={imageSource} />
        <View style={styles.bodyContainer}>
          <Text style={styles.title}>{props.user.name}</Text>
          <Text style={styles.subTitle}>{props.user.profession}</Text>
        </View>
      </View>
      <Icon
        color={colors.secondary}
        type="ionicon"
        name="ios-location"
        onPress={handleLocationClick}
        containerStyle={styles.mapIcon}
      />
      <Icon
        color={colors.secondary}
        type="ionicon"
        name="ios-call"
        onPress={handlePhoneClick}
        containerStyle={styles.mapIcon}
      />
      <Icon
        color={colors.secondary}
        type="ionicon"
        name={isSelected ? 'ios-checkmark-circle' : 'ios-add-circle'}
        size={30}
        onPress={handleAddClick}
      />
    </Pressable>
  );
};

export default UserListItem;

const styles = StyleSheet.create({
  bodyContainer: {},
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    borderWidth: 1,
    borderRadius: 30,
    width: 60,
    height: 60,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  mapIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
  },
  subTitle: {
    fontSize: 16,
    color: 'gray',
  },
});
