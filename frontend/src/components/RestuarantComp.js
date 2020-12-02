import React from 'react';
import {StyleSheet, Text, View, Pressable, TextInput} from 'react-native';
import {useWindowDimensions} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonStyles from '../CommonStyles';
import ListItemComp from './ListItemComp';
const RestuarantComp = ({selectedLocation, setShow, setShowLocationList}) => {
  const dimensions = useWindowDimensions();
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
      />
      <View style={{flex: 2}}>
        <ListItemComp setShow={setShow} />
      </View>
    </View>
  );
};

export default RestuarantComp;

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
