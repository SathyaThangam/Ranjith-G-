import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import CommonStyles from '../CommonStyles';
const RestaurantComp = ({data}) => {
  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={{padding: 20}}>
        <ImageBackground
          style={styles.imagebg}
          borderRadius={10}
          source={{uri: data.restaurant.featured_image}}>
          <Text
            style={{backgroundColor: '#009bd3', padding: 5, color: 'white'}}>
            Use Code WELCOME for 50% OFF
          </Text>
        </ImageBackground>
        <Text style={{fontSize: 20}}>{data.restaurant.name}</Text>
        <View style={CommonStyles.horizontalView}>
          <Text></Text>
          <Text>{data.restaurant.user_rating.aggregate_rating} </Text>
          <Text>{data.restaurant.user_rating.votes}</Text>
        </View>
        <View>
          <Text>{data.restaurant.cuisines}</Text>
        </View>
        <Text>
          {`${data.restaurant.currency} ${
            data.restaurant.average_cost_for_two / 2
          } per person`}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RestaurantComp;

const styles = StyleSheet.create({
  imagebg: {
    width: '100%',
    height: 300,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 10,
    paddingBottom: 10,
  },
});
