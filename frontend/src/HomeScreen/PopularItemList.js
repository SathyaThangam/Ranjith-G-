import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const POPULAR_ITEMS = [
  {
    id: '70af88ea9eb1ecbb',
    title: 'T. Nagar (399 places)',
  },
  {
    id: '224912cb0e7097b1',
    title: 'Nungambakkam (322 places)',
  },
  {
    id: '227e2bfb41b78156',
    title: 'Velachery (525 places)',
  },
  {
    id: 'b5d1fe333bb91973',
    title: 'Adyar (244 places)',
  },
  {
    id: '1a96393a2cb8b396',
    title: 'Anna Nagar East (359 places)',
  },
  {
    id: 'dc142df45d7a3b2a',
    title: 'Thuraipakkam (312 places)',
  },
];

const PopularItem = ({title}) => (
  <View style={styles.popularItem}>
    <Text style={styles.popularItemTitle}>{title}</Text>
    <AntDesign name="right" size={15} />
  </View>
);

const PopularItemList = () => {
  return (
    <View style={{flex: 1}}>
      {POPULAR_ITEMS.map(({id, title}) => (
        <PopularItem key={id} title={title} />
      ))}
    </View>
  );
};

export default PopularItemList;

const styles = StyleSheet.create({
  popularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgb(232, 232, 232)',
    justifyContent: 'space-between',
  },
  popularItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
