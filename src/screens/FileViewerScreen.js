import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import AppHeaderButton from '../components/AppHeaderButtons';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

const FileViewerScreen = ({navigation}) => {
  const [file, setFile] = useState(undefined);

  useEffect(() => {
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

  const handlePickFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        copyTo: 'documentDirectory',
      });
      setFile(res.fileCopyUri);
      // setFile(decodeURI(res.fileCopyUri.replace('file://', '')));
    } catch (e) {
      Alert.alert('Error', 'Something went wrong while opening file');
    }
  };

  return (
    <View style={styles.container}>
      {file ? (
        <Pdf style={styles.pdfContainer} source={{uri: file}} />
      ) : (
        <Button type="solid" title="Open File" onPress={handlePickFile} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
