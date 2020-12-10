import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {getDataFromStore} from '../Utils/storeUtils';
import {getRequest} from '../Utils/networkUtils';
import OrderItem from './OrderItem';
import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
const OrdersComp = () => {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getOrders = async () => {
    setRefreshing(true);
    try {
      const token = await getDataFromStore('token');
      const headers = {authorization: `Bearer ${token}`};
      const data = await getRequest({url: '/order/getAll', headers, data: {}});
      // console.log(data.data);
      setRefreshing(false);
      return data.data;
    } catch (error) {
      console.log(error.status);
      return null;
    }
  };

  useEffect(() => {
    getOrders()
      .then((data) => {
        setOrders(data.reverse());
      })
      .catch((err) => console.log(err));
  }, []);

  const dateFromTimeStamp = (timestamp) =>
    dayjs(timestamp * 1000).format('DD MMMM YYYY');

  const renderItem = ({item}) => {
    const date = dateFromTimeStamp(item.order_payment_details.created_at);
    const amount = item.order_payment_details.amount / 100;
    return (
      <OrderItem
        order_id={item.order_id}
        amount={amount}
        order_currency={item.order_payment_details.currency}
        status={item.order_completed_status}
        date={date}
      />
    );
  };

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: '100%',
          backgroundColor: '#FFf',
        }}
      />
    );
  };

  return (
    <View style={{padding: 10, backgroundColor: '#fff'}}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={() => nanoid(8)}
        ItemSeparatorComponent={FlatListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => getOrders()}
      />
    </View>
  );
};

export default OrdersComp;
