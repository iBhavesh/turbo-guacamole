import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';

const FileViewerScreen = () => {
  const [file, setFile] = useState(undefined);

  useEffect(() => {
    const pick = async () => {
      try {
        const res = await DocumentPicker.pickSingle({
          type: [
            DocumentPicker.types.pdf,
            DocumentPicker.types.plainText,
            DocumentPicker.types.doc,
            DocumentPicker.types.docx,
            DocumentPicker.types.csv,
          ],
        });
        console.log(res);
        setFile(res.fileCopyUri);
      } catch (e) {
        // error
      }
    };

    pick();
  }, []);

  return (
    <View style={styles.container}>
      <Text h3>Not yet finished</Text>
      <Button type="solid" title="Pick Image" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FileViewerScreen;
