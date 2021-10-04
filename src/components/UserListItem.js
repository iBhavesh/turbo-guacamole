import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Linking, Pressable, StyleSheet, View} from 'react-native';
import {Icon, Text} from 'react-native-elements';
import colors from '../constants/colors';

const UserListItem = props => {
  const navigation = useNavigation();
  const goToUserEdit = () => {
    navigation.navigate('UserDetail', props.user);
  };

  const handlePhoneClick = () => {
    Linking.openURL('tel:' + props.user.phone);
  };

  const handleLocationClick = () => {
    Linking.openURL(`geo: 0,0?q=${props.user.address}`);
  };

  return (
    <Pressable
      style={styles.container}
      android_ripple={{color: 'gray'}}
      onPress={goToUserEdit}>
      <View style={styles.leftContainer}>
        <Image
          style={styles.imageContainer}
          source={{
            uri: props.user.image,
          }}
        />
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
