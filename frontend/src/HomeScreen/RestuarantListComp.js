import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
  Keyboard,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonStyles from '../CommonStyles';
import ListItemComp from '../components/ListItemComp';
import debounce from 'lodash.debounce';
import {getRequest} from '../Utils/networkUtils';
import {nanoid} from 'nanoid';
const RestuarantListComp = ({
  selectedLocation,
  setShow,
  setShowLocationList,
}) => {
  const dimensions = useWindowDimensions();

  const renderItem = ({item}) => <ListItemComp setShow={setShow} data={item} />;

  const [searchInput, setSearchInput] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const getRestaurantsResults = async (location, restaurant) => {
    try {
      const {data} = await getRequest({
        url: '/data/restaurants',
        data: {location, restaurant},
      });
      Keyboard.dismiss();
      console.log(data);
      setSearchResults(
        data.map(({thumb, name, cuisines}) => {
          return {image: thumb, title: name, subTitle: cuisines};
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedGetRestaurantsResults = debounce(getRestaurantsResults, 1000);
  useEffect(() => {
    if (searchInput !== '')
      debouncedGetRestaurantsResults(selectedLocation, searchInput);
    return debouncedGetRestaurantsResults.cancel;
  }, [searchInput]);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Pressable onPress={() => setShowLocationList(true)}>
          <View style={[CommonStyles.horizontalView]}>
            <Text style={styles.location}>{selectedLocation}</Text>
            <AntDesign
              style={{paddingLeft: 10}}
              name="caretdown"
              size={25}
              color="#FF6666"
            />
          </View>
        </Pressable>
        <AntDesign
          name="close"
          style={{
            position: 'relative',
            left: dimensions.width / 4,
          }}
          size={25}
          onPress={() => setShow(false)}
        />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for restaurant, cuisine or a dish.."
        value={searchInput}
        onChangeText={(text) => setSearchInput(text)}
      />
      <View style={{paddingBottom: 20}}>
        <FlatList
          keyExtractor={() => nanoid(8)}
          renderItem={renderItem}
          data={searchResults}
        />
      </View>
    </View>
  );
};

export default RestuarantListComp;

const styles = StyleSheet.create({
  location: {
    fontSize: 18,
  },
  searchInput: {
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'rgb(156,156,156)',
  },
});
