import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AddButton from './AddButton';
const MenuItem = ({name, currency, price, uniqueID, setOrderList}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 0) {
      setOrderList((prev) => {
        const temp = [...prev];
        let flag = false;
        temp.forEach((item) => {
          if (item.uniqueID === uniqueID) {
            item.price = price * count;
            item.count = count;
            flag = true;
          }
        });
        if (!flag) {
          temp.push({name, currency, price, uniqueID, count});
        }
        return temp;
      });
    }
  }, [count]);

  return (
    <View style={styles.MenuItem}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 24}}>{name}</Text>
        <AddButton count={count} setCount={setCount} />
      </View>
      <Text>{`${currency} ${price.toFixed(2)}`}</Text>
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  MenuItem: {paddingVertical: 10, paddingHorizontal: 5},
});
