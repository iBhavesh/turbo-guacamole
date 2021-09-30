import React, {useLayoutEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  View,
  StatusBar,
} from 'react-native';
import {isIOS} from 'react-native-elements/dist/helpers';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import AppHeaderButton from '../components/AppHeaderButtons';
import {
  useHeaderHeight,
  getDefaultHeaderHeight,
} from '@react-navigation/elements';
import Snackbar from 'react-native-snackbar';
// import TextInput from '../components/TextInput';

const initialHeight = Dimensions.get('window').height * 0.8;

const TextEditorScreen = ({navigation}) => {
  const RichText = useRef();
  const [article, setArticle] = useState('');
  const headerHeight = useHeaderHeight();

  const articleChangeHandler = text => {
    setArticle(text);
  };

  useLayoutEffect(() => {
    const handleSave = () => {
      if (!article) {
        return Snackbar.show({
          text: 'Enter some data to save',
        });
      }
      navigation.replace('TabTextFileView', {article});
    };
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
          <Item iconName="ios-save" onPress={handleSave} />
        </HeaderButtons>
      ),
    });
  }, [navigation, article]);

  return (
    <KeyboardAvoidingView
      enabled={true}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{flex: 1}}
      behavior={isIOS ? 'padding' : 'height'}
      keyboardVerticalOffset={
        getDefaultHeaderHeight(
          {
            height: Dimensions.get('screen').height,
            width: Dimensions.get('screen').width,
          },
          false,
          StatusBar.currentHeight,
        ) + headerHeight
      }>
      {/* <TextInput
        placeholder="Enter filename"
        onChangeText={props.fileNameChangeHandler}
        error={props.fileNameError}
      /> */}
      {/*eslint-disable-next-line react-native/no-inline-styles*/}
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.container}>
          <RichEditor
            placeholder="Start typing"
            initialHeight={initialHeight}
            style={styles.rich}
            ref={RichText}
            onChange={articleChangeHandler}
            useContainer={true}
          />
        </ScrollView>
      </View>
      <RichToolbar
        editor={RichText}
        selectedIconTint={'#2095F2'}
        disabledIconTint={'#bfbfbf'}
      />
    </KeyboardAvoidingView>
  );
};

export default TextEditorScreen;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: '#F5FCFF',
  },
  rich: {
    // minHeight: 500,
    flex: 1,
  },
});
