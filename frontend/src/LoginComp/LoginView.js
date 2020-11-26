import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonStyles from '../CommonStyles';
import COLORS from '../ColorConstants';
import OutlinedInputComp from '../components/OutlinedInputComp';
import PasswordComp from './PasswordComp';
const LoginView = ({setShow, setShowLogin, loginData, setLoginData}) => {
  return (
    <View style={{padding: 10}}>
      <View
        style={[
          CommonStyles.horizontalView,
          {justifyContent: 'space-between'},
        ]}>
        <Text style={styles.title}>Login</Text>
        <MaterialCommunityIcons
          name="close"
          size={30}
          onPress={() => setShow(false)}
        />
      </View>
      <OutlinedInputComp
        placeholder="Email"
        value={loginData.email}
        onChangeText={(text) =>
          setLoginData((prev) => {
            return {
              ...prev,
              email: text,
            };
          })
        }>
        <MaterialCommunityIcons name="email" size={30} color="#FF6666" />
      </OutlinedInputComp>
      <PasswordComp
        placeholder="Password"
        value={loginData.password}
        onChangeText={(text) =>
          setLoginData((prev) => {
            return {...prev, password: text};
          })
        }>
        <MaterialCommunityIcons name="lock-open" size={30} color="#FF6666" />
      </PasswordComp>
      <Pressable>
        <View
          accessibilityRole="button"
          style={[
            CommonStyles.basicBtn,
            {backgroundColor: '#FF6666', borderRadius: 8},
          ]}>
          <Text style={{color: 'white', fontSize: 18}}>Login</Text>
        </View>
      </Pressable>
      <View style={[CommonStyles.horizontalView, {marginTop: 20}]}>
        <Text style={{fontSize: 18}}>New to Zomato? </Text>
        <Pressable onPress={() => setShowLogin(false)}>
          <Text style={{fontSize: 18, color: COLORS.RED}}>Create Account</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginView;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  input: {
    flex: 2,
    fontSize: 18,
    paddingLeft: 10,
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgb(156,156,156)',
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
