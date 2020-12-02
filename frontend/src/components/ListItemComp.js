import React from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import mockData from '../data/mockdata.json';
import CommonStyles from '../CommonStyles';
import {useNavigation} from '@react-navigation/native';
const ListItemComp = ({setShow}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('DEV');
        setShow(false);
      }}>
      <View style={[CommonStyles.horizontalView, {marginHorizontal: 10}]}>
        <Image style={styles.image} source={{uri: mockData.thumb}} />
        <View>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>Title</Text>
          <Text style={{fontSize: 20, color: 'rgb(156,156,156)'}}>
            sub title
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ListItemComp;

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 10,
  },
});
