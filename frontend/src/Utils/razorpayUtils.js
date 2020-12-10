import RazorpayCheckout from 'react-native-razorpay';
// import {postRequest} from './networkUtils';
import COLORS from '../ColorConstants';
export const initiateRazorpayPayment = async ({order_id, amount}) => {
  const options = {
    description: 'Delivered at your doorstep',
    currency: 'INR',
    key: 'rzp_test_RMPy7D0r6knqam',
    name: 'Zomato Clone',
    order_id: order_id,
    theme: {color: COLORS.RED},
  };

  return await RazorpayCheckout.open(options);
};
