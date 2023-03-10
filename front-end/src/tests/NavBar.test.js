import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Context from '../context/context';
import NavBar from '../components/NavBar';

const pedidos = 'Meus Pedidos';

describe('NavBar', () => {
  const contextMock = {
    setIsLoged: jest.fn(),
  };

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('Deveria redirecionar o cliente corretamente ao clicar em Meus Pedidos', () => {
    const userMock = { name: 'User Name', role: 'customer' };
    localStorage.setItem('user', JSON.stringify(userMock));
    const history = createMemoryHistory();

    render(
      <Context.Provider value={ contextMock }>
        <Router history={ history }>
          <NavBar />
        </Router>
      </Context.Provider>,
    );

    fireEvent.click(screen.getByText(pedidos));

    expect(history.location.pathname).toBe('/customer/orders');
  });

  it('Deveria redirecionar o vendedor corretamente ao clicar em Meus Pedidos', () => {
    const userMock = { name: 'User Name', role: 'seller' };
    localStorage.setItem('user', JSON.stringify(userMock));
    const history = createMemoryHistory();

    render(
      <Context.Provider value={ contextMock }>
        <Router history={ history }>
          <NavBar />
        </Router>
      </Context.Provider>,
    );

    fireEvent.click(screen.getByText(pedidos));

    expect(history.location.pathname).toBe('/seller/orders');
  });

  it('Deveria redirecionar o ADM corretamente ao clicar em Meus Pedidos', () => {
    const userMock = { name: 'User Name', role: 'administrator' };
    localStorage.setItem('user', JSON.stringify(userMock));
    const history = createMemoryHistory();

    render(
      <Context.Provider value={ contextMock }>
        <Router history={ history }>
          <NavBar />
        </Router>
      </Context.Provider>,
    );

    fireEvent.click(screen.getByText(pedidos));

    expect(history.location.pathname).toBe('/admin/manage');
  });

  it('Deveria limpar o localStorage e ir para a página de login ao fazer logout', () => {
    const setIsLoged = jest.fn();
    const user = { name: 'John Doe', role: 'customer' };
    localStorage.setItem('user', JSON.stringify(user));
    const history = createMemoryHistory();

    function NavBarWithContext() {
      const contextValue = React.useMemo(() => ({ setIsLoged }), []);
      return (
        <Context.Provider value={ contextValue }>
          <NavBar />
        </Context.Provider>
      );
    }

    const { getByTestId } = render(
      <Router history={ history }>
        <NavBarWithContext />
      </Router>,
    );

    const logoutButton = getByTestId(
      'customer_products__element-navbar-link-logout',
    );
    fireEvent.click(logoutButton);

    expect(setIsLoged).toHaveBeenCalledWith(false);
    expect(localStorage.getItem('user')).toBeNull();
    expect(history.location.pathname).toBe('/login');
  });
});
