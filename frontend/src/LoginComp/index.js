import React, {useState, useEffect} from 'react';
import {Alert, Keyboard} from 'react-native';
import LoginView from './LoginView';
import SignupView from './SignupView';
import LogOutView from './LogOutView';
import {
  login,
  signup,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../Utils/authUtils';
import {
  saveDataToStore,
  getDataFromStore,
  deleteDataFromStore,
} from '../Utils/storeUtils';
const LoginComp = ({setShow}) => {
  const [showLogin, setShowLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    cPassword: '',
  });

  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    getDataFromStore('token')
      .then((token) => {
        console.log(token);
        if (token !== null) {
          setLoginStatus(true);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setLoginData((prev) => {
      return {
        ...prev,
        password: '',
      };
    });
    setSignUpData((prev) => {
      return {
        ...prev,
        password: '',
        cPassword: '',
      };
    });
  }, [showLogin]);

  const handleLogin = () => {
    Keyboard.dismiss();
    const {email, password} = loginData;
    if (validateEmail(email) && validatePassword(password))
      login(email, password)
        .then(({data, status}) => {
          if (data.message === 'Unavailable') {
            Alert.alert(
              "Account doesn't exist",
              'Please create an account before logging in',
              [
                {
                  text: 'OK',
                  onPress: () => setShowLogin(false),
                },
              ],
              {
                onDismiss: () => setShowLogin(false),
              },
            );
          } else if (data.message === 'Success') {
            const {accessToken} = data.token;
            saveDataToStore('token', accessToken)
              .then((data) => {
                setShow(false);
              })
              .catch((err) => console.error('store error', err));
          }
        })
        .catch((err) => console.error('login error', err));
    else {
      Alert.alert('Invalid Email/Password');
    }
  };

  const handleSignup = () => {
    Keyboard.dismiss();
    const {email, password, cPassword} = signUpData;
    if (
      validateEmail(email) &&
      validatePassword(password) &&
      validateConfirmPassword(password, cPassword)
    )
      signup(email, password, cPassword)
        .then(({data, status}) => {
          console.log('data', data);
          if (status === 200) {
            if (data.message === 'success') {
              saveDataToStore('token', data.token.accessToken)
                .then((success) => {
                  setShow(false);
                })
                .catch((err) => console.log(err));
            } else if (data.message === 'Unavailable') {
              Alert.alert(
                'Account already exists',
                'Please try with a different mail',
                [
                  {
                    text: 'OK',
                    onPress: () => setShowLogin(false),
                  },
                ],
                {
                  onDismiss: () => setShowLogin(false),
                },
              );
            }
          } else if (status === 403) {
            console.log('object');
            Alert.alert(
              'Account already exists',
              'Please try with a different mail',
              [
                {
                  text: 'OK',
                  onPress: () => setShowLogin(false),
                },
              ],
              {
                onDismiss: () => setShowLogin(false),
              },
            );
          }
        })
        .catch((err) => console.error('signup error', err));
    else {
      Alert.alert('Inavalid Email/Password');
    }
  };

  const handleLogOut = () => {
    deleteDataFromStore('token')
      .then(() => setLoginStatus(false))
      .catch((err) => console.error(err));
  };

  return loginStatus ? (
    <LogOutView setShow={setShow} handleLogOut={handleLogOut} />
  ) : showLogin ? (
    <LoginView
      setShow={setShow}
      setShowLogin={setShowLogin}
      loginData={loginData}
      setLoginData={setLoginData}
      handleLogin={handleLogin}
    />
  ) : (
    <SignupView
      setShow={setShow}
      setShowLogin={setShowLogin}
      signUpData={signUpData}
      setSignUpData={setSignUpData}
      handleSignup={handleSignup}
    />
  );
};

export default LoginComp;
