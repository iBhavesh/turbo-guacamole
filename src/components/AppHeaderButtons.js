import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';

import Icon from 'react-native-vector-icons/Ionicons';
import {isIOS} from 'react-native-elements/dist/helpers';
import colors from '../constants/colors';

const AppHeaderButton = props => {
  return (
    <HeaderButton
      IconComponent={Icon}
      iconSize={20}
      color={isIOS ? colors.primary : 'white'}
      {...props}
    />
  );
};
export default AppHeaderButton;
