import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Context from '../context/context';
import CheckoutAddress from '../components/CheckoutAdress';
import localStorageMock from './mocks/LocalStorage.mock';
// import { api } from '../services/requests';
import Checkout from '../pages/Checkout';
import { checkoutValues } from './mocks/Context.mock';
import CheckoutTable from '../components/CheckoutTable';

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 10,
    quantity: 2,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 5,
    quantity: 3,
  },
];

beforeEach(() => {
  localStorage.setItem('user', JSON.stringify(localStorageMock));
});

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe('Teste da página Checkout', () => {
  beforeEach(async () => {
    render(
      <MemoryRouter initialEntries={ ['/customer/checkout'] }>
        <Context.Provider value={ checkoutValues }>
          <Route path="/customer/products">
            <Checkout />
          </Route>
        </Context.Provider>
      </MemoryRouter>,
    );
  });

  const contextValues = {
    setCheckoutTotal: jest.fn(),
    cartProducts: products,
    setCartProducts: jest.fn(),
  };

  it('Deveria Renderizar a tabela corretamente', () => {
    const { getByTestId } = render(
      <Context.Provider value={ contextValues }>
        <CheckoutTable products={ products } onRemove={ jest.fn() } />
      </Context.Provider>,
    );

    expect(getByTestId('customer_element-order-table'))
      .toBeInTheDocument();
    expect(getByTestId('customer_checkout__element-order-table-item-number-0'))
      .toHaveTextContent('1');
    expect(getByTestId('customer_checkout__element-order-table-name-0'))
      .toHaveTextContent('Product 1');
    expect(getByTestId('customer_checkout__element-order-table-quantity-0'))
      .toHaveTextContent('2');
    expect(getByTestId('customer_checkout__element-order-table-unit-price-0'))
      .toHaveTextContent('10,00');
    expect(getByTestId('customer_checkout__element-order-table-sub-total-0'))
      .toHaveTextContent('20,00');
    expect(getByTestId('customer_checkout__element-order-table-item-number-1'))
      .toHaveTextContent('2');
    expect(getByTestId('customer_checkout__element-order-table-name-1'))
      .toHaveTextContent('Product 2');
    expect(getByTestId('customer_checkout__element-order-table-quantity-1'))
      .toHaveTextContent('3');
    expect(getByTestId('customer_checkout__element-order-table-unit-price-1'))
      .toHaveTextContent('5,00');
    expect(getByTestId('customer_checkout__element-order-table-sub-total-1'))
      .toHaveTextContent('15,00');
  });
});

describe('Testa o componente CheckoutAddress', () => {
  const setAdressValues = jest.fn();
  const setOrderResponse = jest.fn();
  const mockContextValue = {
    adressValues: { address: '', number: '', seller: 'Fulana Pereira' },
    setAdressValues,
    cartProducts: [
      { id: 1, name: 'Product 1', price: '10.00', quantity: 2 },
      { id: 2, name: 'Product 2', price: '5.50', quantity: 1 },
    ],
    checkoutTotal: '25.50',
    setOrderResponse,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deveria renderizar o componente CheckoutAddress', () => {
    render(
      <Context.Provider value={ mockContextValue }>
        <CheckoutAddress />
      </Context.Provider>,
    );

    const checkoutTitle = screen.getByText('Detalhes e Endereço para Entrega');
    const sellerLabel = screen.getByLabelText('P. Vendedora Responsável:');
    const addressLabel = screen.getByLabelText('Endereço');
    const numberLabel = screen.getByLabelText('Número');
    const submitButton = screen.getByRole('button', { name: 'FINALIZAR PEDIDO' });

    expect(checkoutTitle).toBeInTheDocument();
    expect(sellerLabel).toBeInTheDocument();
    expect(addressLabel).toBeInTheDocument();
    expect(numberLabel).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
