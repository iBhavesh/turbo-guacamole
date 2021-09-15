import React from 'react';
import {StyleSheet, View} from 'react-native';

const Card = props => {
  return <View style={[styles.card, props.style]}>{props.children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'white',
    elevation: 5,
    // alignItems: 'center',
  },
});
