import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Context from '../context/context';
import AdminNavBar from '../components/AdminNavBar';

const logoutButtonTestId = 'customer_products__element-navbar-link-logout';

describe('NavBar', () => {
  const setIsLogedMock = jest.fn();
  const contextMock = {
    setIsLoged: setIsLogedMock,
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('Deveria mostrar o nome do administrador na NavBar', () => {
    const userMock = { name: 'User Name' };
    localStorage.setItem('user', JSON.stringify(userMock));
    render(
      <Context.Provider value={ contextMock }>
        <AdminNavBar />
      </Context.Provider>,
    );

    const userFullName = screen.getByTestId(
      'customer_products__element-navbar-user-full-name',
    );
    expect(userFullName.textContent).toBe(userMock.name);
  });

  it('Deveria fazer logout corretamente', () => {
    const userMock = { name: 'User Name', role: 'customer' };
    localStorage.setItem('user', JSON.stringify(userMock));
    const history = createMemoryHistory();
    render(
      <Context.Provider value={ contextMock }>
        <Router history={ history }>
          <AdminNavBar />
        </Router>
      </Context.Provider>,
    );

    const logoutButton = screen.getByTestId(logoutButtonTestId);
    fireEvent.click(logoutButton);

    expect(setIsLogedMock).toHaveBeenCalledWith(false);
    expect(localStorage.getItem('user')).toBeNull();
    expect(history.location.pathname).toBe('/login');
  });
});
