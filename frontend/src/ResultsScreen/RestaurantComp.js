import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Switch,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonStyles from '../CommonStyles';
import {nanoid} from 'nanoid';
import MenuItem from './MenuItem';
const RestaurantComp = ({data}) => {
  const [vegOnly, setVegOnly] = useState(false);

  const [dishList, setDishList] = useState(() => data.dishes);

  useEffect(() => {
    setDishList((prev) => {
      if (vegOnly) {
        return prev.filter((dish) => dish.diet.toLowerCase() === 'vegetarian');
      }
      return prev;
    });
  }, [vegOnly]);
  const renderItem = ({item}) => (
    <MenuItem name={item.name} price={168} currency={data.currency} />
  );
  return (
    <View>
      <ImageBackground
        style={styles.imagebg}
        resizeMode="cover"
        source={{uri: data.featured_image}}>
        <Text style={{backgroundColor: '#009bd3', padding: 5, color: 'white'}}>
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
        <SafeAreaView style={{flex: 1}}>
          <FlatList
            data={dishList}
            renderItem={renderItem}
            keyExtractor={() => nanoid(8)}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default RestaurantComp;

const styles = StyleSheet.create({
  imagebg: {
    width: '100%',
    height: 300,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    marginBottom: 10,
  },
});
