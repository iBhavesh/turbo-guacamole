import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import DashboardGridItem from '../components/DashboardGridItem';
import {DrawerParamList} from '../navigator/DrawerNavigator';
import {MainStackParamList} from '../navigator/MainNavigator';

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

type Props = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'DashboardScreen'>,
  NativeStackScreenProps<MainStackParamList>
>;

const DashboardScreen = ({navigation}: Props) => {
  const renderitem: ListRenderItem<{
    id: number;
    name: string;
  }> = ({item}) => {
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
