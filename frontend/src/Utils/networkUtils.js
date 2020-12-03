import axios from 'axios';
const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://zomato-clone-backend.herokuapp.com'
    : 'http://192.168.225.41:8080';

const postRequest = async ({url, data, headers}) => {
  try {
    const response = await axios.post(`${API_URL}${url}`, data, {
      headers: headers,
    });
    return response;
  } catch (err) {
    if (err.response.status === 403) return err.response;
    throw err;
  }
};

const getRequest = async ({url, data, headers}) => {
  try {
    const response = await axios.get(`${API_URL}${url}`, {
      headers: headers,
      params: data,
    });
    return response;
  } catch (err) {
    if (err.response.status === 403) return err.response;
    throw err;
  }
};

export {postRequest, getRequest};
