import React, {useLayoutEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import AppHeaderButton from '../components/AppHeaderButtons';

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
      <Button type="solid" title="Open File" onPress={handlePickFile} />
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
