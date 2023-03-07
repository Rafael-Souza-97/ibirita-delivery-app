import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint, token) => {
  setToken(token);
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestUpdateStatus = async (endpoint, body) => {
  const { data } = await api.put(endpoint, body);
  return data;
};

export const requestRegister = async (endpoint, body) => {
  try {
    const { data } = await api.post(endpoint, body);
    return data;
  } catch (error) {
    if (error.response) {
      console.log(
        'Status:',
        error.response.status,
        ' Message:',
        error.response.data.message,
      );
      return error.response.data.message;
    }
    console.log('Error', error.response.data.message);
  }
};

export const requestCheckout = async (body) => {
  try {
    const { data } = await api.post('http://localhost:3001/sales', body);

    return data;
  } catch (error) {
    if (error.response) {
      console.log(
        'Status:',
        error.response.status,
        ' Message:',
        error.response.data.message,
      );
      return error.response.data.message;
    }
    console.log('Error', error.response.data.message);
  }
};

export const requestSales = async () => {
  try {
    const { data } = await api.get('http://localhost:3001/sales');

    return data;
  } catch (error) {
    if (error.response) {
      console.log(
        'Status:',
        error.response.status,
        ' Message:',
        error.response.data.message,
      );
      return error.response.data.message;
    }
    console.log('Error', error.response.data.message);
  }
};

export const requestUsers = async (id) => {
  try {
    const { data } = await api.get(`http://localhost:3001/users/${id}`);

    return data;
  } catch (error) {
    if (error.response) {
      console.log(
        'Status:',
        error.response.status,
        ' Message:',
        error.response.data.message,
      );
      return error.response.data.message;
    }
    console.log('Error', error.response.data.message);
  }
};

export default api;
