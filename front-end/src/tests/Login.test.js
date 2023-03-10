import React from 'react';
import { act, render, fireEvent, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Context from '../context/context';
import LoginPage from '../pages/Login';
import loginDataMock from './mocks/Login.mock';
import { contextValues } from './mocks/Context.mock';
import { api } from '../services/requests';

const mockSetIsLoged = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({
    isLoged: false,
    setIsLoged: mockSetIsLoged,
  }),
}));

const emailInput = 'common_login__input-email';
const emailTest = 'test@test.com';
const passwordInput = 'common_login__input-password';
const passwordTest = '123456';
const loginButton = 'common_login__button-login';
const customerEmail = 'zebirita@email.com';
const customerPassword = '$#zebirita#$';
const TIME_MS = 1500;

describe('Teste da página Login', () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Deveria renderizar o input de email', async () => {
    const { getByTestId } = render(
      <Router history={ history }>
        <Context.Provider value={ contextValues }>
          <LoginPage />
        </Context.Provider>
      </Router>,
    );

    await waitFor(() => {
      expect(getByTestId(emailInput)).toBeInTheDocument();
    });

    fireEvent.change(getByTestId(emailInput), { target: { value: emailTest } });
    expect(getByTestId(emailInput).value).toBe(emailTest);
  });

  it('Deveria renderizar o input de senha', async () => {
    const { getByTestId } = render(
      <Router history={ history }>
        <Context.Provider value={ contextValues }>
          <LoginPage />
        </Context.Provider>
      </Router>,
    );

    await waitFor(() => {
      expect(getByTestId(passwordInput)).toBeInTheDocument();
    });

    fireEvent.change(getByTestId(passwordInput), { target: { value: passwordTest } });
    expect(getByTestId(passwordInput).value).toBe(passwordTest);
  });

  it('Deveria renderizar o botão de login', async () => {
    const { getByTestId } = render(
      <Router history={ history }>
        <Context.Provider value={ contextValues }>
          <LoginPage />
        </Context.Provider>
      </Router>,
    );

    await waitFor(() => {
      expect(getByTestId(loginButton)).toBeInTheDocument();
    });
  });

  it('Deveria habilitar o botão de login ao passar dados válidos', () => {
    const { getByTestId } = render(
      <Router history={ history }>
        <Context.Provider value={ contextValues }>
          <LoginPage />
        </Context.Provider>
      </Router>,
    );

    fireEvent.change(getByTestId(emailInput), { target: { value: emailTest } });
    fireEvent.change(getByTestId(passwordInput), { target: { value: passwordTest } });
    expect(getByTestId(loginButton)).not.toBeDisabled();

    fireEvent.change(getByTestId(emailInput), { target: { value: 'invalid_email' } });
    fireEvent.change(getByTestId(passwordInput), { target: { value: '12345' } });
    expect(getByTestId(loginButton)).toBeDisabled();
  });

  it('Deveria mostrar mensagem de erro ao logar com credenciais inválidas', async () => {
    let getByTestId;

    await act(async () => {
      ({ getByTestId } = render(
        <Router history={ history }>
          <Context.Provider value={ contextValues }>
            <LoginPage />
          </Context.Provider>
        </Router>,
      ));
    });

    fireEvent.change(getByTestId(emailInput), { target: { value: emailTest } });
    fireEvent.change(getByTestId(passwordInput), { target: { value: passwordTest } });

    await waitFor(() => {
      fireEvent.click(getByTestId(loginButton));
      expect(getByTestId('common_login__element-invalid-email')).toBeInTheDocument();
    });
  });

  it('Deveria redirecionar para o cadastro ao clicar no botão de registro', async () => {
    const { getByTestId } = render(
      <Router history={ history }>
        <Context.Provider value={ contextValues }>
          <LoginPage />
        </Context.Provider>
      </Router>,
    );

    await waitFor(() => {
      fireEvent.click(getByTestId('common_login__button-register'));
    });

    expect(history.location.pathname).toBe('/register');
  });

  it('Deveria logar corretamente o usuário', async () => {
    history.location.pathname = '/login';
    const { getByTestId } = render(
      <Router history={ history }>
        <Context.Provider value={ contextValues }>
          <LoginPage />
        </Context.Provider>
      </Router>,
    );

    jest.spyOn(api, 'post').mockResolvedValue(loginDataMock);

    fireEvent.change(getByTestId(emailInput), { target: { value: customerEmail } });
    fireEvent
      .change(getByTestId(passwordInput), { target: { value: customerPassword } });
    await waitFor(() => {
      fireEvent.click(getByTestId(loginButton));
    });

    setTimeout(() => {
      expect(history.location.pathname).toBe('/customer/products');
    }, TIME_MS);
  });

  it('Deveria logar corretamente o administrador', async () => {
    history.location.pathname = '/login';
    const { getByTestId } = render(
      <Router history={ history }>
        <Context.Provider value={ contextValues }>
          <LoginPage />
        </Context.Provider>
      </Router>,
    );

    jest.spyOn(api, 'post').mockResolvedValue(loginDataMock);

    fireEvent.change(getByTestId(emailInput), { target:
      { value: 'adm@deliveryapp.com' } });
    fireEvent.change(getByTestId(passwordInput), { target: { value: '--adm2@21!!--' } });
    await waitFor(() => {
      fireEvent.click(getByTestId(loginButton));
    });

    setTimeout(() => {
      expect(history.location.pathname).toBe('/admin/manage');
    }, TIME_MS);
  });

  it('Deveria logar corretamente o vendedor', async () => {
    history.location.pathname = '/login';
    const { getByTestId } = render(
      <Router history={ history }>
        <Context.Provider value={ contextValues }>
          <LoginPage />
        </Context.Provider>
      </Router>,
    );

    jest.spyOn(api, 'post').mockResolvedValue(loginDataMock);

    fireEvent.change(getByTestId(emailInput), { target:
      { value: 'fulana@devileryapp.com' } });
    fireEvent.change(getByTestId(passwordInput), { target: { value: 'fulana@123' } });

    await waitFor(() => {
      fireEvent.click(getByTestId(loginButton));
    });

    setTimeout(() => {
      expect(history.location.pathname).toBe('/seller/orders');
    }, TIME_MS);
  });
});
