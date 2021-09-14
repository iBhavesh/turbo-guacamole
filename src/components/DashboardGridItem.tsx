import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
};

const DashboardGridItem = (props: Props) => {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{color: '#918a8a'}}
        style={styles.touchableStyle}
        onPress={props.onPress}>
        <View style={styles.gridView}>
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    height: 150,
    margin: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    elevation: 5,
  },
  gridView: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
  },
  touchableStyle: {
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
});

export default DashboardGridItem;
