import React from 'react';
import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';
import mockData from '../data/mockdata.json';
import RestaurantComp from './RestaurantComp';
// const ResultsScreen = () => {
//   const renderItem = ({item}) => <RestaurantComp data={item} />;

//   console.log(mockData[0].restaurants[0]);
//   return (
//     <View style={{flex: 1}}>
//       <SafeAreaView style={{flex: 3}}>
//         <FlatList
//           contentContainerStyle={{flexGrow: 1}}
//           data={mockData[0].restaurants}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.restaurant.id}
//         />
//       </SafeAreaView>
//     </View>
//   );
// };

const ResultsScreen = () => {
  return <RestaurantComp data={mockData} />;
};

export default ResultsScreen;

const styles = StyleSheet.create({});
