import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

import colors from '../constants/colors';

const RegisterHeader = props => {
  return (
    <ImageBackground style={styles.titleBackground}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
    </ImageBackground>
  );
};

export default RegisterHeader;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 34,
    color: colors.white,
  },
  titleContainer: {
    alignItems: 'center',
  },
  titleBackground: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
    width: '100%',
    // height: 150,
    // top: '-30%',
    justifyContent: 'flex-end',
    paddingTop: '10%',
    paddingBottom: '20%',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    color: colors.white,
  },
});
