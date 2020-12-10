import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import COLORS from '../ColorConstants';
const OrderItem = ({order_id, amount, order_currency, status, date}) => {
  let statusColor = '#000';
  switch (status) {
    case 'created':
      statusColor = COLORS.GREY;
      break;
    case 'success':
      statusColor = '#05cc72';
      break;
    case 'failure':
      statusColor = COLORS.RED;
      break;
    case 'cancelled':
      statusColor = COLORS.RED;
      break;
  }

  return (
    <View style={{padding: 5, borderWidth: StyleSheet.hairlineWidth}}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>{order_id}</Text>
        </View>
        <Text style={{fontWeight: 'bold', color: COLORS.RED, fontSize: 20}}>
          {`${amount} ${order_currency}`}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={{fontSize: 18}}>Payment</Text>
        <Text style={{fontSize: 18, color: statusColor}}>{status}</Text>
      </View>
      <View style={styles.container}>
        <Text style={{color: COLORS.GREY}}>Ordered at:</Text>
        <Text style={{color: COLORS.GREY}}>{date}</Text>
      </View>
    </View>
  );
};

export default memo(OrderItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2.5,
  },
});
