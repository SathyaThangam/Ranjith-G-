import RazorpayCheckout from 'react-native-razorpay';
// import {postRequest} from './networkUtils';
import COLORS from '../ColorConstants';
export const initiateRazorpayPayment = ({order_id, amount}) => {
  console.log(amount);
  const options = {
    description: 'Delivered at your doorstep',
    currency: 'INR',
    key: 'rzp_test_RMPy7D0r6knqam',
    name: 'Zomato Clone',
    order_id: order_id,
    theme: {color: COLORS.RED},
  };

  RazorpayCheckout.open(options)
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
};
