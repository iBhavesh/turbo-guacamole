import React, {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

type Props = {
  children: ReactNode;
  styles?: ViewStyle;
};

const Card = (props: Props) => {
  return <View style={[styles.card, props.styles]}>{props.children}</View>;
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
