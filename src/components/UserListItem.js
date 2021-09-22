import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

const UserListItem = props => {
  const navigation = useNavigation();
  const goToUserEdit = () => {
    navigation.navigate('UserDetail');
  };

  return (
    <Pressable
      style={styles.container}
      android_ripple={{color: 'gray'}}
      onPress={goToUserEdit}>
      {/* <View style={styles.imageContainer}>
        <Text>i</Text>
      </View> */}
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{props.user.name}</Text>
        <Text style={styles.subTitle}>{props.user.profession}</Text>
      </View>
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
  title: {
    fontSize: 20,
  },
  subTitle: {
    fontSize: 16,
    color: 'gray',
  },
});
