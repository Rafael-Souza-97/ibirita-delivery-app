import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  const [productsArray, setProductsArray] = useState([]);

  const contextValue = useMemo(() => {
    const objState = {
      productsArray,
      setProductsArray,
    };
    return objState;
  }, [productsArray, setProductsArray]);

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
