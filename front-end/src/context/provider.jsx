import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  const [adressValues, setAdressValues] = useState({
    seller: '',
    address: '',
    number: '',
  });

  const contextValue = useMemo(() => {
    const objState = {
      adressValues,
      setAdressValues,
    };
    return objState;
  }, [adressValues, setAdressValues]);

  return (
    <context.Provider value={ contextValue }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.node.isRequired,
};

export default Provider;
