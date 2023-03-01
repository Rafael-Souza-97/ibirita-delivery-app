import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  const [productsArray, setProductsArray] = useState([]);
  const [totalValue, setTotalValue] = useState([]);
  const [adressValues, setAdressValues] = useState({
    seller: '',
    address: '',
    number: '',
  });

  const contextValue = useMemo(() => {
    const objState = {
      productsArray,
      totalValue,
      adressValues,
      setProductsArray,
      setTotalValue,
      setAdressValues,
    };
    return objState;
  }, [
    productsArray,
    totalValue,
    adressValues,
    setProductsArray,
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
