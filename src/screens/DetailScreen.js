import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const DetailScreen = ({route}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.item.name} Screen</Text>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
});
