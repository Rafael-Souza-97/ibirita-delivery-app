import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  const [search, setSearch] = useState('oi');

  const contextValue = useMemo(() => {
    const objState = {
      search,
      setSearch,
    };
    return objState;
  }, [search, setSearch]);

  return (
    <context.Provider value={ contextValue }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

export default Provider;
