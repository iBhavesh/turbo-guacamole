import React, {useLayoutEffect} from 'react';
import {FlatList} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import DashboardGridItem from '../components/DashboardGridItem';
import AppHeaderButton from '../components/AppHeaderButtons';

const items = [
  {id: 1, name: 'Food'},
  {id: 2, name: 'Shoes'},
  {id: 3, name: 'Laptops'},
  {id: 4, name: 'Mobiles'},
  {id: 5, name: 'Household'},
  {id: 6, name: 'Clothes'},
  {id: 7, name: 'Gaming'},
  {id: 8, name: 'Computer'},
  {id: 9, name: 'Accessories'},
  {id: 10, name: 'Fruits'},
  {id: 11, name: 'Gaming'},
  {id: 12, name: 'Computer'},
  {id: 13, name: 'Accessories'},
  {id: 14, name: 'Fruits'},
];

const DashboardScreen = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
          <Item title="Fav" iconName="dots-vertical" onPress={() => {}} />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const renderitem = ({item}) => {
    return (
      <DashboardGridItem
        title={item.name}
        onPress={() => {
          navigation.navigate('DetailScreen', {item});
        }}
      />
    );
  };

  return (
    <FlatList
      scrollEnabled
      numColumns={2}
      data={items}
      renderItem={renderitem}
    />
  );
};

export default DashboardScreen;
