import React from 'react';
import {View} from 'react-native';
import CommonStyles from '../CommonStyles';
import OptionItem from './OptionItem';
const OptionItemList = () => {
  return (
    <View>
      <View style={CommonStyles.horizontalView}>
        <OptionItem
          image={require('../img/food1.png')}
          title="Order Food online"
        />
        <OptionItem
          image={require('../img/food2.png')}
          title="Go out for a meal"
        />
      </View>
      <View style={CommonStyles.horizontalView}>
        <OptionItem
          image={require('../img/food3.png')}
          title="Nightlife & Clubs"
        />
        <OptionItem image={require('../img/food4.png')} title="Zomato Pro" />
      </View>
    </View>
  );
};

export default OptionItemList;
