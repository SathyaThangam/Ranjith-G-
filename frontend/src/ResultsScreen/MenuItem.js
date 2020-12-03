import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AddButton from './AddButton';
const MenuItem = ({name, currency, price}) => {
  return (
    <View style={styles.MenuItem}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 24}}>{name}</Text>
        <AddButton />
      </View>
      <Text>{`${currency} ${price.toFixed(2)}`}</Text>
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  MenuItem: {paddingVertical: 10, paddingHorizontal: 5},
});
