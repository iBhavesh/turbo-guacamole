import React, {useState} from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import ImageCropPicker from 'react-native-image-crop-picker';

import ImageGridItem from '../components/ImageGridItem';
import VideoGridItem from '../components/VideoGridItem';

const ImageGalleryScreen = () => {
  const [images, setImages] = useState({});
  const handleImagePicker = async () => {
    try {
      const response = await ImageCropPicker.openPicker({
        multiple: true,
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

  const getChoice = () => {
    Alert.alert('Choose', 'Select which one you would like to do', [
      {
        text: 'Image',
        onPress: () => handlePickFromCamera('image'),
      },
      {
        text: 'Video',
        onPress: () => handlePickFromCamera('video'),
      },
    ]);
  };

  const handlePickFromCamera = async choice => {
    try {
      let options = {
        height: 400,
        width: 300,
        mediaType: 'image',
      };
      if (choice === 'video') {
        options = {mediaType: 'video'};
      }
      const response = await ImageCropPicker.openCamera(options);
      const newImages = {};
      newImages[response.path] = response;
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

  if (Object.keys(images).length === 0) {
    return (
      <View style={styles.buttonContainer}>
        <Button
          containerStyle={styles.buttonStyle}
          type="solid"
          title="Pick from gallery"
          onPress={handleImagePicker}
        />
        <Button type="solid" title="Use Camera" onPress={getChoice} />
      </View>
    );
  }

  let imageGrid = [];
  for (const key in images) {
    if (Object.hasOwnProperty.call(images, key)) {
      if (images[key].mime.startsWith('image')) {
        imageGrid.push(
          <ImageGridItem key={key} imagePath={key} onDelete={onDelete} />,
        );
      }
      if (images[key].mime.startsWith('video')) {
        imageGrid.push(
          <VideoGridItem key={key} videoPath={key} onDelete={onDelete} />,
        );
      }
    }
  }

  return (
    <View style={styles.container}>
      {imageGrid}
      {/* <View style={styles.imageView}> */}
      {/* <Pressable style={styles.pressable} onPress={handleImagePicker}>
          <Icon type="ionicon" name="ios-add" size={70} />
        </Pressable> */}
      {/* </View> */}
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
  backgroundVideo: {
    width: 300,
    height: 200,
  },
  buttonStyle: {
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
  },
});
