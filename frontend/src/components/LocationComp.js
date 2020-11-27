import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommonStyles from '../CommonStyles';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
const LocationComp = ({setShow}) => {
  const [searchInput, setSearchInput] = useState('');

  const onResultClick = (location) => {
    // console.log(location);
  };

  const popularLocations = [
    'WhiteField,Bangalore',
    'BTM,Bangalore',
    'Marathalli,Bangalore',
  ];

  return (
    <View style={{padding: 10}}>
      <View
        style={[
          CommonStyles.horizontalView,
          {justifyContent: 'space-between'},
        ]}>
        <Text style={styles.title}>Select location</Text>
        <MaterialIcons name="close" size={30} onPress={() => setShow(false)} />
      </View>
      <View style={[CommonStyles.horizontalView, styles.inputContainer]}>
        <MaterialIcons name="search" size={30} color="#ccc" />
        <TextInput
          style={{fontSize: 18, flex: 2}}
          placeholder="Bengaluru"
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
        />
        {searchInput.length > 0 ? (
          <MaterialIcons
            name="close"
            size={25}
            color="#bbb"
            onPress={() => setSearchInput('')}
          />
        ) : null}
      </View>
      <MaterialIcons.Button
        name="my-location"
        style={styles.clearRed}
        backgroundColor="transparent"
        size={30}
        color="#e74c3c">
        <Text style={{fontSize: 18, color: '#e74c3c'}}>
          Detect Current Location
        </Text>
      </MaterialIcons.Button>
      <View>
        <Text
          style={styles.greyHeading}
          onPress={(e) => console.log(e.currentTarget)}>
          Popular Locations
        </Text>
        {popularLocations.map((location) => (
          <Text
            key={nanoid(8)}
            style={styles.borderBottom}
            onPress={(e) => onResultClick(location)}>
            {location}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default LocationComp;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  inputContainer: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: '#ccc',
  },
  clearRed: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  greyHeading: {
    paddingTop: 15,
    fontSize: 18,
    color: 'rgb(156, 156, 156)',
  },
  borderBottom: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 10,
    fontSize: 20,
    color: 'rgb(54, 54, 54)',
  },
});
