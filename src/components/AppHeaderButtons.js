import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {isIOS} from 'react-native-elements/dist/helpers';
import colors from '../constants/colors';

const AppHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Icon}
      iconSize={20}
      color={isIOS ? colors.primary : 'white'}
    />
  );
};
export default AppHeaderButton;
