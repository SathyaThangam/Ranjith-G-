import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import CommonStyles from '../CommonStyles';
import COLORS from '../ColorConstants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const LogOutView = ({setShow, handleLogOut}) => {
  return (
    <View style={{padding: 10}}>
      <View
        style={[
          CommonStyles.horizontalView,
          {justifyContent: 'space-between'},
        ]}>
        <Text style={styles.title}>Logout</Text>
        <MaterialCommunityIcons
          name="close"
          size={30}
          onPress={() => {
            setShow(false);
          }}
        />
      </View>
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
