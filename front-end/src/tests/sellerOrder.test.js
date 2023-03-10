import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import SellerOrders from '../pages/SellerOrders';
import { requestData } from '../services/requests';
import Context from '../context/context';

jest.mock('../services/requests');

describe('SellerOrders component', () => {
  const NUMBER_TIMEOUT = 2000;

  beforeEach(async () => {
    const pedidos = [
      {
        id: 1,
        sellerId: 1,
        totalPrice: 10,
        deliveryAddress: '123 Main St',
        deliveryNumber: '456',
        status: 'Delivered',
        saleDate: '2022-03-09T11:25:07.382Z',
      },
      {
        id: 2,
        sellerId: 1,
        totalPrice: 20,
        deliveryAddress: '456 Elm St',
        deliveryNumber: '789',
        status: 'On the way',
        saleDate: '2022-03-08T15:12:09.482Z',
      },
    ];

    requestData.mockResolvedValue(pedidos);
    const isLoged = jest.fn();

    const localStorageMock = {
      email: 'zebirita@email.com',
      id: 3,
      name: 'Cliente Zé Birita',
      role: 'customer',
    };
    localStorage.setItem('user', JSON.stringify(localStorageMock));

    render(
      <MemoryRouter initialEntries={ ['/seller/orders'] }>
        <Context.Provider
          value={ isLoged }
        >
          <Route path="/seller/orders">
            <SellerOrders />
          </Route>
        </Context.Provider>
      </MemoryRouter>,
    );
  });

  it('should render loading text while fetching orders', async () => {
    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText('Loading...')).toBeInTheDocument();
      }, NUMBER_TIMEOUT);
    });
  });

  it('should render orders after fetching data', async () => {
    await waitFor(() => {
      setTimeout(() => {
        const orderStatus = screen
          .getByTestId('seller_orders__element-delivery-status-1');
        const orderId = screen.getByTestId('seller_orders__element-order-id-1');
        const orderDate = screen.getByTestId('seller_orders__element-order-date-1');
        const orderPrice = screen.getByTestId('customer_orders__element-card-price-1');
        const orderAddress = screen.getByText('123 Main St, 456');
        expect(orderStatus).toBeInTheDocument();
        expect(orderId).toBeInTheDocument();
        expect(orderDate).toBeInTheDocument();
        expect(orderPrice).toBeInTheDocument();
        expect(orderAddress).toBeInTheDocument();
      }, NUMBER_TIMEOUT);
    });
  });
});
