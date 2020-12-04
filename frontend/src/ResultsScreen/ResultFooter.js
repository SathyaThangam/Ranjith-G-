import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CommonStyles from '../CommonStyles';
import COLORS from '../ColorConstants';
const ResultFooter = ({orders}) => {
  return (
    <View style={styles.footer}>
      <View style={[CommonStyles.horizontalView]}>
        <View style={{flex: 2}}>
          <View style={{paddingLeft: 10}}>
            <Text style={{fontSize: 16}}>1 item</Text>
            <Text style={{fontSize: 18}}>Rs. 168.00</Text>
            <Text style={{color: COLORS.GREY}}>(plus taxes)</Text>
          </View>
        </View>
        <View
          style={[CommonStyles.basicBtn, styles.continueBtn]}
          accessibilityRole="button">
          <Text style={{color: 'white', fontWeight: 'bold'}}>Continue</Text>
        </View>
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
