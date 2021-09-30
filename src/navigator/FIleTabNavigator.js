import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {isIOS} from 'react-native-elements/dist/helpers';

import colors from '../constants/colors';
import FileViewerScreen from '../screens/FileViewerScreen';
import TextEditorScreen from '../screens/TextEditorScreen';
import TextFileViewScreen from '../screens/TextFileViewScreen';

const Stack = createNativeStackNavigator();

const FileTabNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: !isIOS ? colors.white : colors.primary,
        headerStyle: !isIOS ? {backgroundColor: colors.primary} : {},
      }}>
      <Stack.Screen name="TabFileScreen" component={FileViewerScreen} />
      <Stack.Screen
        name="TabFileEdit"
        component={TextEditorScreen}
        options={{title: 'Edit'}}
      />
      <Stack.Screen
        name="TabTextFileView"
        component={TextFileViewScreen}
        options={{title: 'File'}}
      />
    </Stack.Navigator>
  );
};

export default FileTabNavigator;
