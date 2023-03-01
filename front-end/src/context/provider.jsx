import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  const [productsArray, setProductsArray] = useState([]);
  const [adressValues, setAdressValues] = useState({
    seller: '',
    address: '',
    number: '',
  });

  const contextValue = useMemo(() => {
    const objState = {
      productsArray,
      setProductsArray,
      adressValues,
      setAdressValues,
    };
    return objState;
  }, [
    productsArray,
    adressValues,
    setProductsArray,
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
