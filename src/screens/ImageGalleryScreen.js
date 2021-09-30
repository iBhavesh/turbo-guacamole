import React, {useState} from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import ImageCropPicker from 'react-native-image-crop-picker';

import ImageGridItem from '../components/ImageGridItem';

const ImageGalleryScreen = () => {
  const [images, setImages] = useState({});
  const handleImagePicker = async () => {
    try {
      const response = await ImageCropPicker.openPicker({
        multiple: true,
        mediaType: 'photo',
      });
      if (!response) {
        return;
      }
      const newImages = {};
      response.forEach(value => {
        newImages[value.path] = value;
      });
      setImages(prev => ({...prev, ...newImages}));
    } catch (e) {
      if (e.message === 'User cancelled image selection') {
        return;
      }
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const onDelete = path => {
    const newImages = {...images};
    delete newImages[path];
    setImages(newImages);
  };

  let imageGrid = [];
  for (const key in images) {
    if (Object.hasOwnProperty.call(images, key)) {
      imageGrid.push(
        <ImageGridItem key={key} imagePath={key} onDelete={onDelete} />,
      );
    }
  }

  return (
    <View style={styles.container}>
      {imageGrid}
      <View style={styles.imageView}>
        <Pressable style={styles.pressable} onPress={handleImagePicker}>
          <Icon type="ionicon" name="ios-add" size={70} />
        </Pressable>
      </View>
    </View>
  );
};

export default ImageGalleryScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageView: {
    height: 100,
    width: 100,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'dashed',
    margin: 5,
  },
  pressable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
