import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CommonStyles from '../CommonStyles';
const RestaurantScreen = () => {
  return (
    <View>
      <Image
        source={require('../img/food1.png')}
        style={{width: '100%', height: 300}}
      />
      <View style={CommonStyles.horizontalView}>
        <Text>Ratins svg</Text>
        <Text>Rating svg</Text>
      </View>
    </View>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({});
