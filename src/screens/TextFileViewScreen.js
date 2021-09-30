import React from 'react';
import {StyleSheet} from 'react-native';
import HtmlView from 'react-native-htmlview';

const TextFileViewScreen = props => {
  return <HtmlView stylesheet={styles} value={props.route.params.article} />;
};

const styles = StyleSheet.create({
  a: {
    fontWeight: 'bold',
    color: 'purple',
  },
  div: {
    fontFamily: 'monospace',
    fontSize: 24,
  },
});

export default TextFileViewScreen;
