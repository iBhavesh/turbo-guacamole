import React from 'react';
// eslint-disable-next-line no-unused-vars
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

const ImageGridItem = props => {
  return (
    <View style={styles.imageView}>
      <ImageBackground
        style={styles.imageBackground}
        source={{uri: props.imagePath}}>
        <Pressable
          style={styles.pressable}
          onPress={() => {
            props.onDelete(props.imagePath);
          }}>
          <Icon size={20} type="ionicon" name="ios-close" />
        </Pressable>
      </ImageBackground>
    </View>
  );
};

export default ImageGridItem;

const styles = StyleSheet.create({
  imageBackground: {
    height: 100,
    width: 100,
    alignItems: 'flex-end',
    paddingTop: 7,
    paddingRight: 7,
  },
  imageView: {
    height: 100,
    width: 100,
    borderRadius: 20,
    overflow: 'hidden',
    margin: 5,
  },
  pressable: {backgroundColor: '#fff', borderRadius: 30},
});
