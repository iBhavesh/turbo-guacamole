import React, {useLayoutEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import DashboardGridItem from '../components/DashboardGridItem';
import AppHeaderButton from '../components/AppHeaderButtons';
import {SearchBar, Text} from 'react-native-elements';
import colors from '../constants/colors';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

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

  const searchOpacity = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: searchOpacity.value,
    };
  });

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
              searchOpacity.value = withTiming(1, {
                duration: 700,
                easing: Easing.inOut(Easing.exp),
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
  }, [navigation, searchOpacity]);

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

  const hideSearchbar = async () => {
    setshowSearchBar(false);
    navigation.setOptions({
      headerShown: true,
    });
  };

  return (
    <>
      {showSearchBar && (
        <Animated.View style={animatedStyles}>
          <SearchBar
            autoFocus
            onClear={() => {
              searchOpacity.value = withTiming(0, {
                duration: 500,
                easing: Easing.inOut(Easing.exp),
              });
              setTimeout(() => {
                hideSearchbar();
              }, 300);
            }}
            containerStyle={{backgroundColor: colors.primary}}
            inputContainerStyle={{backgroundColor: colors.white}}
            onChangeText={value => {
              setSearchData(value);
              const re = new RegExp(value, 'i');
              const newItems = items.filter(item => item.name.match(re));
              setListItems(newItems);
            }}
            value={searchData}
            onEndEditing={() => {
              if (!searchData) {
                searchOpacity.value = withTiming(0, {
                  duration: 1000,
                  easing: Easing.inOut(Easing.exp),
                });
                setTimeout(() => {
                  hideSearchbar();
                }, 300);
              }
            }}
          />
        </Animated.View>
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
