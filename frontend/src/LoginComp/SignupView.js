import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonStyles from '../CommonStyles';
import COLORS from '../ColorConstants';
import OutlinedInputComp from '../components/OutlinedInputComp';
import PasswordComp from './PasswordComp';
const SignUpView = ({setShow, setShowLogin, signUpData, setSignUpData}) => {
  return (
    <View style={{padding: 10}}>
      <View
        style={[
          CommonStyles.horizontalView,
          {justifyContent: 'space-between'},
        ]}>
        <Text style={styles.title}>Signup</Text>
        <MaterialCommunityIcons
          name="close"
          size={30}
          onPress={() => setShow(false)}
        />
      </View>
      <OutlinedInputComp
        placeholder="Email"
        value={signUpData.email}
        onChangeText={(text) =>
          setSignUpData((prev) => {
            return {
              ...prev,
              email: text,
            };
          })
        }>
        <MaterialCommunityIcons name="email" size={30} color={COLORS.GREY} />
      </OutlinedInputComp>
      <PasswordComp
        placeholder="Password"
        value={signUpData.password}
        onChangeText={(text) =>
          setSignUpData((prev) => {
            return {...prev, password: text};
          })
        }>
        <MaterialCommunityIcons
          name="lock-open"
          size={30}
          color={COLORS.GREY}
        />
      </PasswordComp>
      <PasswordComp
        placeholder="Confirm Password"
        value={signUpData.cPassword}
        onChangeText={(text) =>
          setSignUpData((prev) => {
            return {...prev, cPassword: text};
          })
        }>
        <MaterialCommunityIcons
          name="lock-open"
          size={30}
          color={COLORS.GREY}
        />
      </PasswordComp>
      <Pressable>
        <View
          accessibilityRole="button"
          style={[
            CommonStyles.basicBtn,
            {backgroundColor: '#FF6666', borderRadius: 8},
          ]}>
          <Text style={{color: 'white', fontSize: 18}}>Sign up</Text>
        </View>
      </Pressable>
      <View style={[CommonStyles.horizontalView, {marginTop: 20}]}>
        <Text style={{fontSize: 18}}>Existing User? </Text>
        <Pressable onPress={() => setShowLogin(true)}>
          <Text style={{fontSize: 18, color: COLORS.RED}}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUpView;

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
