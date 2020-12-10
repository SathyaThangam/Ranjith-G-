import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import CommonStyles from '../CommonStyles';
import COLORS from '../ColorConstants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
const LogOutView = ({setShow, handleLogOut}) => {
  const navigation = useNavigation();
  return (
    <View style={{padding: 10}}>
      <View
        style={[
          CommonStyles.horizontalView,
          {justifyContent: 'space-between'},
        ]}>
        <Text style={styles.title}>Profile</Text>
        <MaterialCommunityIcons
          name="close"
          size={30}
          onPress={() => {
            setShow(false);
          }}
        />
      </View>
      <Pressable
        onPress={() => {
          navigation.push('Orders');
          setShow(false);
        }}>
        <View
          style={{
            marginVertical: 5,
            padding: 5,
          }}>
          <Text>Email</Text>
        </View>
        <View
          style={{
            marginVertical: 5,
            padding: 5,
          }}>
          <Text>My Orders</Text>
        </View>
      </Pressable>
      <Text style={styles.subHeading}>Do you want to log out?</Text>
      <View style={CommonStyles.horizontalView}>
        <Pressable style={styles.secondaryBtn} onPress={() => handleLogOut()}>
          <View style={CommonStyles.basicBtn}>
            <Text style={{color: 'white', fontSize: 18}}>Yes</Text>
          </View>
        </Pressable>
        <Pressable style={styles.priorityBtn} onPress={() => setShow(false)}>
          <View style={CommonStyles.basicBtn}>
            <Text style={{color: 'white', fontSize: 18}}>No</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default LogOutView;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subHeading: {
    paddingTop: 20,
    fontSize: 20,
  },
  priorityBtn: {
    flex: 1,
    backgroundColor: COLORS.RED,
    borderRadius: 10,
    margin: 10,
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: COLORS.GREY,
    borderRadius: 10,
    margin: 10,
  },
});
