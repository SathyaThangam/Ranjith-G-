import RazorpayCheckout from 'react-native-razorpay';
import {postRequest} from './networkUtils';
import COLORS from '../ColorConstants';
const initiateRazorpayPayment = ({order_id, currency, amount}) => {
  const options = {
    description: 'your description here',
    currency: currency,
    key: '<YOUR_KEY_ID>',
    amount: amount,
    name: 'Zomato Clone',
    order_id: order_id, //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.

    theme: {color: COLORS.RED},
  };
};
