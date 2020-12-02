import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonStyles from '../CommonStyles';
import COLORS from '../ColorConstants';
import OutlinedInputComp from '../components/OutlinedInputComp';
import PasswordComp from './PasswordComp';
import {getDataFromStore} from '../Utils/storeUtils';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../Utils/authUtils';
const SignUpView = ({
  setShow,
  setShowLogin,
  signUpData,
  setSignUpData,
  handleSignup,
}) => {
  const [inputValidColors, setInputValidColors] = useState({
    email: COLORS.GREY,
    password: COLORS.GREY,
    cPassword: COLORS.GREY,
  });

  useEffect(() => {
    getDataFromStore('token')
      .then((data) => {
        if (data !== null)
          //user logged in use better method to check
          console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const onChangeText = (text, property, validateFn) => {
    setSignUpData((prev) => {
      return {...prev, [property]: text};
    });
    setInputValidColors((prev) => {
      if (text === '') return {...prev, [property]: COLORS.GREY};
      if (property === 'cPassword')
        return {
          ...prev,
          [property]: validateFn(signUpData.password, text)
            ? COLORS.GREEN
            : COLORS.RED,
        };
      return {
        ...prev,
        [property]: validateFn(text) ? COLORS.GREEN : COLORS.RED,
      };
    });
  };

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
          onPress={() => {
            setSignUpData({email: '', password: '', cPassword: ''});
            setShow(false);
          }}
        />
      </View>
      <OutlinedInputComp
        placeholder="Email"
        value={signUpData.email}
        onChangeText={(text) => onChangeText(text, 'email', validateEmail)}>
        <MaterialCommunityIcons
          name="email"
          size={30}
          color={inputValidColors.email}
        />
      </OutlinedInputComp>
      <PasswordComp
        placeholder="Password"
        value={signUpData.password}
        onChangeText={(text) =>
          onChangeText(text, 'password', validatePassword)
        }>
        <MaterialCommunityIcons
          name="lock-open"
          size={30}
          color={inputValidColors.password}
        />
      </PasswordComp>
      <PasswordComp
        placeholder="Confirm Password"
        value={signUpData.cPassword}
        onChangeText={(text) =>
          onChangeText(text, 'cPassword', validateConfirmPassword)
        }>
        <MaterialCommunityIcons
          name="lock-open"
          size={30}
          color={inputValidColors.cPassword}
        />
      </PasswordComp>
      <Pressable onPress={() => handleSignup()}>
        <View
          accessibilityRole="button"
          style={[
            CommonStyles.basicBtn,
            {backgroundColor: '#FF6666', borderRadius: 8},
          ]}>
          <Text style={{color: 'white', fontSize: 18}}>Sign up</Text>
        </View>
      </Pressable>
      <View>
        <Text>Password should be 8-16 letters</Text>
        <Text>
          Password should contain atleast a number,a symbol and an alphabet
        </Text>
      </View>
      <View style={[CommonStyles.horizontalView, {marginTop: 20}]}>
        <Text style={{fontSize: 18}}>Existing User? </Text>
        <Pressable onPress={() => setShowLogin(true)}>
          <Text style={{fontSize: 18, color: COLORS.RED}}>Sign In</Text>
        </Pressable>
        <Text></Text>
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
