import React from 'react';
import {Image, Linking, ScrollView, StyleSheet, View} from 'react-native';
import {Icon, Input} from 'react-native-elements';

const UserDetailScreen = ({route}) => {
  const user = route.params;

  const handlePhoneClick = () => {
    Linking.openURL('tel:' + user.phone);
  };

  const handleLocationClick = () => {
    Linking.openURL('geo:22.5062956,88.3432681?q=' + 'Kathpole');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: user.image,
          }}
        />
      </View>
      <Input
        label="Full name"
        labelStyle={styles.labelStyle}
        value={user.name}
        disabled
        disabledInputStyle={styles.inputStyle}
      />
      <Input
        label="Profession"
        labelStyle={styles.labelStyle}
        value={user.profession}
        disabled
        disabledInputStyle={styles.inputStyle}
      />
      <Input
        label="Phone"
        labelStyle={styles.labelStyle}
        value={user.phone}
        disabled
        disabledInputStyle={styles.inputStyle}
        rightIcon={
          <Icon
            type="ionicon"
            name="ios-call"
            color="#454545"
            onPress={handlePhoneClick}
          />
        }
      />
      <Input
        label="Address"
        labelStyle={styles.labelStyle}
        value={user.address}
        multiline
        disabled
        disabledInputStyle={styles.inputStyle}
        rightIcon={
          <Icon
            type="ionicon"
            name="ios-location"
            color="#454545"
            onPress={handleLocationClick}
          />
        }
      />
    </ScrollView>
  );
};

export default UserDetailScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: 5,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  inputStyle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    opacity: 1,
  },
  labelStyle: {
    fontSize: 16,
    opacity: 0.7,
    color: 'black',
  },
  title: {
    fontSize: 30,
  },
  subTitle: {
    fontSize: 24,
    color: 'gray',
  },
});
