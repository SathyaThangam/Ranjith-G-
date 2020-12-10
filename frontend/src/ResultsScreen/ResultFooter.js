import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import CommonStyles from '../CommonStyles';
import COLORS from '../ColorConstants';
import {postRequest} from '../Utils/networkUtils';
import {getDataFromStore} from '../Utils/storeUtils';
import {initiateRazorpayPayment} from '../Utils/razorpayUtils';
import {useNavigation} from '@react-navigation/native';
const ResultFooter = ({orders}) => {
  const [hasOrders, setHasOrders] = useState(false);

  const [totalAmount, setTotalAmount] = useState(0);

  const [clicked, setClicked] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (orders.length > 0) {
      setHasOrders(true);
      setTotalAmount(
        orders.reduce((total, current) => total + current.price, 0),
      );
    }
  }, [orders]);

  const handleContinue = async () => {
    setClicked(true);
    if (clicked) {
      const postData = {amount: totalAmount, orders};
      try {
        const token = await getDataFromStore('token');
        const header = {authorization: `Bearer ${token}`};
        const {data} = await postRequest({
          url: '/order/create',
          headers: header,
          data: postData,
        });
        // const paymentOrder = await initiateRazorpayPayment({
        //   order_id: data.id,
        //   amount: totalAmount,
        // });
        // console.log('payment order', paymentOrder);
        initiateRazorpayPayment({order_id: data.id, amount: totalAmount})
          .then(async (paymentOrder) => {
            const captureData = {
              total_price: totalAmount,
              order_id: data.id,
              razorpay_data: paymentOrder,
            };
            const capturePayment = await postRequest({
              url: '/order/capture',
              headers: header,
              data: captureData,
            });
            console.log('paymentOrder', paymentOrder);
            console.log('capturePayment', capturePayment.status);
          })
          .catch((error) => {
            if (
              error.error &&
              error.error.reason === 'payment_cancelled' &&
              error.error.source === 'customer'
            ) {
              postRequest({
                url: '/order/cancelorder',
                headers: header,
                data: {order_id: data.id},
              })
                .then((res) => console.log(res))
                .catch((err) => console.log('err', err));
            }
          });
      } catch (error) {
        // {"code": 0, "error": {"code": "BAD_REQUEST_ERROR", "description": "Payment processing cancelled by user", "reason": "payment_cancelled", "source": "customer", "step": "payment_authentication"}}

        console.error(error);
      }
      navigation.push('Orders');
    }
    setClicked(false);
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
