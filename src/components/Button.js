import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

const Button = props => {
  return (
    <Pressable
      style={styles.container}
      onPress={props.onPress}
      android_ripple={{color: 'white'}}>
      <Text style={styles.textStyle}>{props.title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c5a97',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    paddingHorizontal: 10,
    width: 100,
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
  },
});
