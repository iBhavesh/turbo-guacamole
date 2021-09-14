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
      android_ripple={{color: '#beb9b9'}}>
      <Text style={styles.textStyle}>{props.title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // width: 100,
    borderRadius: 20,
    padding: 5,
  },
  textStyle: {
    color: '#2c5a97',
    fontSize: 18,
  },
});
