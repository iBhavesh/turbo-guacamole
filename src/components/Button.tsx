import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}

const Button = (props: Props) => {
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
