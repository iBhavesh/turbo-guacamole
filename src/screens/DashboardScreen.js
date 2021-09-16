import React, {useLayoutEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import DashboardGridItem from '../components/DashboardGridItem';
import AppHeaderButton from '../components/AppHeaderButtons';
import {SearchBar, Text} from 'react-native-elements';
import colors from '../constants/colors';

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
  const [showSearchBar, setshowSearchBar] = useState(false);
  const [listItems, setListItems] = useState(items);
  const [searchData, setSearchData] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderButton}>
          <Item
            iconName="ios-search"
            onPress={() => {
              navigation.setOptions({
                headerShown: false,
              });
              setshowSearchBar(true);
            }}
          />

          <Item
            title="Fav"
            iconName="ios-ellipsis-vertical"
            onPress={() => {}}
          />
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
    <>
      {showSearchBar && (
        <SearchBar
          autoFocus
          onClear={() => {
            setshowSearchBar(false);
            navigation.setOptions({
              headerShown: true,
            });
          }}
          containerStyle={{backgroundColor: colors.primary}}
          inputContainerStyle={{backgroundColor: colors.white}}
          onChangeText={value => {
            setSearchData(value);
            const newItems = items.filter(item => item.name.includes(value));
            setListItems(newItems);
          }}
          value={searchData}
          onEndEditing={() => {
            if (!searchData) {
              setshowSearchBar(false);
              navigation.setOptions({
                headerShown: true,
              });
            }
          }}
        />
      )}
      {listItems.length === 0 ? (
        <Text h2> No items found </Text>
      ) : (
        <FlatList
          scrollEnabled
          numColumns={2}
          data={listItems}
          renderItem={renderitem}
        />
      )}
    </>
  );
};

export default DashboardScreen;
