import React, {useState, useEffect, memo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Switch,
  ScrollView,
} from 'react-native';
import CommonStyles from '../CommonStyles';
import {nanoid} from 'nanoid';
import MenuItem from './MenuItem';
import ResultFooter from './ResultFooter';
const RestaurantComp = ({data}) => {
  const [vegOnly, setVegOnly] = useState(false);

  const [orderList, setOrderList] = useState([]);

  const [dishList, setDishList] = useState(() =>
    data.dishes.map((item) => {
      const uniqueID = nanoid(8);
      return (
        <MenuItem
          key={uniqueID}
          uniqueID={uniqueID}
          name={item.name}
          price={168}
          currency={data.currency}
          setOrderList={setOrderList}
        />
      );
    }),
  );

  useEffect(() => {
    setDishList((prev) => {
      if (vegOnly) {
        return prev.filter((dish) => dish.diet.toLowerCase() === 'vegetarian');
      }
      return prev;
    });
  }, [vegOnly]);
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.88}}>
        <ImageBackground
          style={styles.imagebg}
          resizeMode="cover"
          source={{uri: data.featured_image}}>
          <Text
            style={{backgroundColor: '#009bd3', padding: 5, color: 'white'}}>
            Use Code WELCOME for 50% OFF
          </Text>
        </ImageBackground>
        <ScrollView style={{padding: 20}}>
          <View style={CommonStyles.horizontalView}>
            <Text></Text>
            {/* <View
            style={[
              CommonStyles.horizontalView,
              {marginRight: 10, backgroundColor: '#ccc'},
            ]}>
            <FontAwesome
              name="star-o"
              size={20}
              style={{marginRight: 5, color: '#F00'}}
            />
            <FontAwesome name="star-o" size={20} style={{marginRight: 5}} />
            <FontAwesome name="star-o" size={20} style={{marginRight: 5}} />
            <FontAwesome name="star-o" size={20} style={{marginRight: 5}} />
            <FontAwesome name="star-o" size={20} style={{marginRight: 5}} />
          </View> */}
            <Text>({data.user_rating.votes} reviews)</Text>
          </View>
          <Text style={{fontSize: 34, paddingVertical: 10}}>{data.name}</Text>
          <Text style={{fontSize: 18, color: '#7c7c7c', paddingVertical: 5}}>
            {data.cuisines}
          </Text>
          <Text style={{color: '#7c7c7c', paddingVertical: 5}}>
            {data.location.locality}
          </Text>
          <View style={CommonStyles.horizontalView}>
            <Text style={{color: '#F4A266', fontSize: 18}}>Open now</Text>
            <Text style={{fontSize: 18}}> - 8 am to 6 pm</Text>
          </View>
          <View style={CommonStyles.horizontalView}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setVegOnly((prev) => !prev)}
              value={vegOnly}
            />
            <Text style={{fontSize: 20, paddingVertical: 15}}>Veg only</Text>
          </View>
          <View style={{flex: 1, paddingBottom: 50}}>{dishList}</View>
        </ScrollView>
      </View>
      <View style={{flex: 0.12}}>
        <ResultFooter orders={orderList} />
      </View>
    </View>
  );
};

export default RestaurantComp;

const styles = StyleSheet.create({
  imagebg: {
    width: '100%',
    height: 200,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    marginBottom: 10,
  },
});
