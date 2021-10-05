import React from 'react';
import {StyleSheet, View, Modal as RNModal} from 'react-native';
import {Button, Icon, Text} from 'react-native-elements';
import colors from '../constants/colors';

const Modal = props => {
  return (
    <RNModal
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
      visible={props.visible}
      onRequestClose={props.onClose}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Icon
            size={80}
            color={colors.secondaryLight}
            type="ionicon"
            name="ios-checkmark-circle"
          />
          <Text h4 h4Style={styles.title}>
            Success
          </Text>
          <Text style={styles.textStyle}>User has been added</Text>
          <Button
            containerStyle={styles.buttonStyle}
            title="OKAY"
            onPress={props.onClose}
          />
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 20,
    borderRadius: 7,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: 18,
  },
});
