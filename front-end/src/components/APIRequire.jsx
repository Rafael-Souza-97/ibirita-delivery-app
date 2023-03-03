import React, { useContext, useEffect } from 'react';
import Context from '../context/context';
import { requestData, setToken } from '../services/requests';

export default function APIRequest() {
  const { setIsLoaded, setProductsArray, setIsertProp } = useContext(Context);
  const userJson = localStorage.getItem('user');
  const userData = JSON.parse(userJson);
  setToken(userData.token);
  const APIGet = async () => {
    const endpoint = 'http://localhost:3001/products';
    const data = await requestData(endpoint);
    setIsLoaded(true);
    setProductsArray(data);
    setIsertProp(true);
  };

  useEffect(() => {
    APIGet();
  }, []);

  return (<div />);
}
