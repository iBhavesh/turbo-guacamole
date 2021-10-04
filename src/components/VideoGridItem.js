import React, {useRef} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements';
import Video from 'react-native-video';

const VideoGridItem = props => {
  const videoRef = useRef();

  return (
    <View>
      <Video
        controls={true}
        ref={videoRef}
        resizeMode="cover"
        source={{uri: props.videoPath}}
        style={styles.backgroundVideo}
      />
      <Pressable
        style={styles.pressable}
        onPress={() => {
          props.onDelete(props.videoPath);
        }}>
        <Icon size={20} type="ionicon" name="ios-close" />
      </Pressable>
    </View>
  );
};

export default VideoGridItem;

const styles = StyleSheet.create({
  backgroundVideo: {
    width: 240,
    height: 135,
  },
  imageView: {
    height: 100,
    width: 100,
    borderRadius: 20,
    overflow: 'hidden',
    margin: 5,
  },
  pressable: {
    backgroundColor: '#fff',
    borderRadius: 30,
    position: 'absolute',
    top: 5,
    right: 5,
  },
});
