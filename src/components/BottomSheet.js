import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Avatar,
  Button,
  Icon,
  ListItem,
  BottomSheet as RNBottomSheet,
  Text,
} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';

import {removeSelectedUser} from '../store/reducers/userSlice';

import colors from '../constants/colors';

const BottomSheet = props => {
  const users = useSelector(state => state.user.selectedUsers);
  const buttonTitle = users.length > 0 ? 'Save' : 'Close';
  return (
    <RNBottomSheet isVisible={props.isVisible}>
      <View style={styles.container}>
        {users.length > 0 ? (
          <ScrollView>
            {users.map((user, i) => (
              <SheetListItem key={i} user={user} />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.textContainer}>
            <Text h4>No Users Selected</Text>
          </View>
        )}
        <View style={styles.buttonContainer}>
          <Button
            title={buttonTitle}
            containerStyle={styles.buttonStyle}
            onPress={props.onClose}
          />
        </View>
      </View>
    </RNBottomSheet>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  buttonStyle: {
    width: '90%',
  },
  container: {
    maxHeight: 400,
    backgroundColor: '#fff',
    paddingBottom: 5,
  },
  textContainer: {
    padding: 15,
    alignItems: 'center',
  },
});

const SheetListItem = props => {
  const dispatch = useDispatch();
  let imageSource = '';
  if (props.user.image) {
    imageSource = {uri: props.user.image};
  } else {
    imageSource = require('../assets/images/profile_placeholder.png');
  }

  return (
    <ListItem bottomDivider>
      <Avatar rounded source={imageSource} />
      <ListItem.Content>
        <ListItem.Title>{props.user.name}</ListItem.Title>
        <ListItem.Subtitle>{props.user.profession}</ListItem.Subtitle>
      </ListItem.Content>
      <Icon
        type="ionicon"
        name="ios-close-circle"
        size={30}
        color={colors.secondary}
        onPress={() => {
          dispatch(removeSelectedUser(props.user.id));
        }}
      />
    </ListItem>
  );
};
