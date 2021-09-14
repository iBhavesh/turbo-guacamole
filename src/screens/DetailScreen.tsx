import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DrawerParamList} from '../navigator/DrawerNavigator';
import {MainStackParamList} from '../navigator/MainNavigator';

type Props = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'DetailScreen'>,
  DrawerScreenProps<DrawerParamList>
>;

const DetailScreen = ({route}: Props) => {
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
