import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  const [productsArray, setProductsArray] = useState([]);
  const [insertProp, setIsertProp] = useState(false);
  const [isLoged, setIsLoged] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [adressValues, setAdressValues] = useState({
    seller: 'fulana',
    address: '',
    number: '',
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const contextValue = useMemo(() => {
    const objState = {
      productsArray,
      cartProducts,
      totalValue,
      checkoutTotal,
      adressValues,
      setProductsArray,
      setCartProducts,
      setTotalValue,
      setCheckoutTotal,
      setAdressValues,
      insertProp,
      setIsertProp,
      isLoaded,
      setIsLoaded,
      isLoged,
      setIsLoged,
    };
    return objState;
  }, [
    productsArray,
    cartProducts,
    totalValue,
    checkoutTotal,
    adressValues,
    setProductsArray,
    setCartProducts,
    setTotalValue,
    setCheckoutTotal,
    setAdressValues,
    insertProp,
    setIsertProp,
    isLoaded,
    setIsLoaded,
    isLoged,
    setIsLoged,
  ]);
  return (
    <context.Provider value={ contextValue }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
