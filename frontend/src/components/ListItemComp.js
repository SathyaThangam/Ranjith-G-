import React from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import CommonStyles from '../CommonStyles';
import {useNavigation} from '@react-navigation/native';
const ListItemComp = ({setShow, data}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('DEV');
        setShow(false);
      }}>
      <View style={[CommonStyles.horizontalView, {marginHorizontal: 10}]}>
        <Image style={styles.image} source={{uri: data.image}} />
        <View>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>{data.title}</Text>
          <Text style={{fontSize: 20, color: 'rgb(156,156,156)'}}>
            {data.subTitle}
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
