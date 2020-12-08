import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import CommonStyles from '../CommonStyles';
import COLORS from '../ColorConstants';
import {postRequest} from '../Utils/networkUtils';
import {getDataFromStore} from '../Utils/storeUtils';
import {initiateRazorpayPayment} from '../Utils/razorpayUtils';
const ResultFooter = ({orders}) => {
  const [hasOrders, setHasOrders] = useState(false);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (orders.length > 0) {
      setHasOrders(true);
      setTotalAmount(
        orders.reduce((total, current) => total + current.price, 0),
      );
    }
  }, [orders]);

  const handleContinue = async () => {
    const postData = {amount: totalAmount, orders};

    try {
      const token = await getDataFromStore('token');
      const header = {authorization: `Bearer ${token}`};
      const {data} = await postRequest({
        url: '/order/create',
        headers: header,
        data: postData,
      });
      const paymentOrder = await initiateRazorpayPayment({
        order_id: data.id,
        amount: totalAmount,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.footer}>
      <View style={[CommonStyles.horizontalView]}>
        <View style={{flex: 2}}>
          <View style={{paddingLeft: 10}}>
            <Text style={{fontSize: 16}}>
              {orders.length < 0
                ? ''
                : orders.length === 1
                ? '1 item'
                : `${orders.length} items`}
            </Text>
            <Text style={{fontSize: 18}}>
              {hasOrders ? totalAmount.toFixed(2) : `0.00`}
            </Text>
            <Text style={{color: COLORS.GREY}}>(plus taxes)</Text>
          </View>
        </View>
        <Pressable
          style={[CommonStyles.basicBtn, styles.continueBtn]}
          onPress={() => handleContinue()}>
          <View accessibilityRole="button">
            <Text style={{color: 'white', fontWeight: 'bold'}}>Continue</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default ResultFooter;

const styles = StyleSheet.create({
  footer: {
    height: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 299,
    paddingHorizontal: 10,
  },
  continueBtn: {
    flex: 1,
    backgroundColor: COLORS.RED,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
