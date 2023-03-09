import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Products from '../pages/Products';
import Context from '../context/context';
import { requestData } from '../services/requests';

jest.mock('../services/requests');

describe('Products', () => {
  const productsArray = [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://example.com/image1.jpg',
      quantity: 0,
      totalValue: 0,
    },
    {
      id: 2,
      name: 'Product 2',
      price: '20',
      urlImage: 'http://example.com/image2.jpg',
    },
  ];

  const setProductsArray = jest.fn();
  const setTotalValue = jest.fn();
  const setCartProducts = jest.fn();
  const totalValue = jest.fn();

  const NUMBER_TIMEOUT = 2000;

  const localStorageMock = {
    email: 'zebirita@email.com',
    id: 3,
    name: 'Cliente Zé Birita',
    role: 'customer',
  };

  beforeEach(() => {
    requestData.mockResolvedValue(productsArray);
    localStorage.setItem('user', JSON.stringify(localStorageMock));
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const objState = {
    productsArray,
    setProductsArray,
    setTotalValue,
    setCartProducts,
    totalValue,
  };

  describe('when the component is mounted', () => {
    beforeEach(async () => {
      render(
        <MemoryRouter initialEntries={ ['/customer/products'] }>
          <Context.Provider
            value={ objState }
          >
            <Route path="/customer/products">
              <Products />
            </Route>
          </Context.Provider>
        </MemoryRouter>,
      );

      await screen.findByTestId('customer_products__img-card-bg-image-1');
      await screen.findByTestId('customer_products__img-card-bg-image-2');
    });

    it('should fetch products from the server and render them', async () => {
      expect(screen.getByText('Skol Lata 250ml')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
      await waitFor(() => {
        setTimeout(() => {
          expect(screen.getByTestId('customer_products__button-cart')).toBeDisabled();
        }, NUMBER_TIMEOUT);
      });
    });

    it('should update the total value when a product quantity changes', async () => {
      fireEvent.click(
        screen.getByTestId('customer_products__button-card-add-item-1'),
      );

      const cardQuantity = await screen
        .findByTestId('customer_products__input-card-quantity-1');

      await waitFor(() => {
        setTimeout(() => {
          expect(cardQuantity).toHaveValue(1);
        }, NUMBER_TIMEOUT);
      });

      fireEvent.click(
        screen.getByTestId('customer_products__button-card-rm-item-1'),
      );

      fireEvent.click(
        screen.getByTestId('customer_products__button-card-rm-item-1'),
      );

      await waitFor(() => {
        setTimeout(() => {
          expect(cardQuantity).toHaveValue(0);
        }, NUMBER_TIMEOUT);
      });
    });

    it('should update the total value when a product quantity changes', async () => {
      fireEvent.change(screen.getByTestId('customer_products__input-card-quantity-2'), {
        target: { value: '2' },
      });
      await waitFor(() => {
        setTimeout(() => {
          expect(screen.getByTestId('customer_products__input-card-quantity-2'))
            .toHaveValue('2');
        }, NUMBER_TIMEOUT);
      });
    });

    it('should display "Finalizar Pedido" after clicking the cart button', async () => {
      fireEvent.click(screen.getByTestId('customer_products__button-cart'));
      await waitFor(() => {
        setTimeout(() => {
          expect(screen.getByText('Finalizar Pedido')).toBeInTheDocument();
        }, NUMBER_TIMEOUT);
      });
    });
  });
});
