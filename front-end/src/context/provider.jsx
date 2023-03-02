import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  const [productsArray, setProductsArray] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalValue, setTotalValue] = useState([]);
  const [adressValues, setAdressValues] = useState({
    seller: 'fulana',
    address: '',
    number: '',
  });

  const contextValue = useMemo(() => {
    const objState = {
      productsArray,
      cartProducts,
      totalValue,
      adressValues,
      setProductsArray,
      setCartProducts,
      setTotalValue,
      setAdressValues,
    };
    return objState;
  }, [
    productsArray,
    cartProducts,
    totalValue,
    adressValues,
    setProductsArray,
    setCartProducts,
    setTotalValue,
    setAdressValues,
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
