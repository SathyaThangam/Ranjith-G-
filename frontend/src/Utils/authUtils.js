import {postRequest} from './networkUtils';

export const login = async (email, password) => {
  if (validateEmail(email) && validatePassword(password)) {
    const requestData = {
      url: '/auth/login',
      data: {
        email,
        password,
      },
    };
    try {
      const response = await postRequest(requestData);
      if (response && response.data)
        return {data: response.data, status: response.status};
      else return null;
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      return null;
    }
  }
};

export const signup = async (email, password, confirmPassword) => {
  if (
    validateEmail(email) &&
    validatePassword(password) &&
    validateConfirmPassword(password, confirmPassword)
  ) {
    const requestData = {
      url: '/auth/signup',
      data: {
        email,
        password,
      },
    };
    try {
      const response = await postRequest(requestData);
      if (response && response.data)
        return {data: response.data, status: response.status};
      else return null;
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      if (error.status) {
        console.log(error);
      }
      return null;
    }
  }
};

export const validateEmail = (value) => {
  const re = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(value);
};

export const validatePassword = (value) => {
  let re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  return re.test(value);
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (confirmPassword === '') return false;
  else return password === confirmPassword;
};
