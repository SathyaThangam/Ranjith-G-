import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getDataFromStore} from '../Utils/storeUtils';
import {getRequest} from '../Utils/networkUtils';
const OrdersComp = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const token = await getDataFromStore('token');
      const headers = {authorization: `Bearer ${token}`};
      const data = await getRequest({url: '/order/getAll', headers, data: {}});
      console.log(data.data);
    } catch (error) {
      console.log(error.status);
    }
  };

  useEffect(() => {}, []);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default OrdersComp;

const styles = StyleSheet.create({});
