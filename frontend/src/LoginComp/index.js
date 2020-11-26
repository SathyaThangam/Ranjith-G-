import React, {useState, useEffect} from 'react';
import LoginView from './LoginView';
import SignupView from './SignupView';
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
  return showLogin ? (
    <LoginView
      setShow={setShow}
      setShowLogin={setShowLogin}
      loginData={loginData}
      setLoginData={setLoginData}
    />
  ) : (
    <SignupView
      setShow={setShow}
      setShowLogin={setShowLogin}
      signUpData={signUpData}
      setSignUpData={setSignUpData}
    />
  );
};

export default LoginComp;
