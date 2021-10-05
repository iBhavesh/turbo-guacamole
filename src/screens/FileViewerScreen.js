import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {Button} from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import AppHeaderButton from '../components/AppHeaderButtons';
import RNFetchBlob from 'rn-fetch-blob';

const FileViewerScreen = ({navigation}) => {
  const [file, setFile] = useState(undefined);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        file ? (
          <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
            <Item
              iconName="ios-close"
              iconSize={30}
              onPress={() => {
                setFile(null);
              }}
            />
          </HeaderButtons>
        ) : null,
    });
  }, [navigation, file]);

  const handleOpenTextEditor = () => {
    navigation.navigate('TabFileEdit');
  };

  const handlePickFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      });
      setFile(res.fileCopyUri);
    } catch (e) {
      if (DocumentPicker.isCancel(e)) {
        return;
      }
      console.log(e);
      Alert.alert('Error', 'Something went wrong while opening file');
    }
  };

  const downloadFile = () => {
    let date = new Date();
    // File URL which we want to download
    let FILE_URL =
      'https://hwpi.harvard.edu/files/torman/files/sample.pdf?m=1594914296';
    let file_ext = '.pdf';

    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        Alert.alert('Success', 'File Downloaded');
        console.log('res -> ', JSON.stringify(res));
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleDownloadFile = async () => {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile();
      } else {
        Alert.alert(
          'Permission Denied',
          'You need to give write permission to download file',
        );
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (file) {
    return <Pdf style={styles.pdfContainer} source={{uri: file}} />;
  }

  return (
    <View style={styles.container}>
      <Button
        type="solid"
        title="Open Text Editor"
        onPress={handleOpenTextEditor}
        containerStyle={styles.buttonStyle}
      />
      <Button
        type="solid"
        title="Open File"
        onPress={handlePickFile}
        containerStyle={styles.buttonStyle}
      />
      <Button type="solid" title="Download File" onPress={handleDownloadFile} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default FileViewerScreen;
