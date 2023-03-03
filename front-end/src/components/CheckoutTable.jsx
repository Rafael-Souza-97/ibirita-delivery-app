import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/context';

function CheckoutTable({ products, onRemove }) {
  const { setCheckoutTotal } = useContext(Context);

  const getTotalPrice = () => {
    const totalPrice = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );

    const formattedPrice = (parseFloat(totalPrice))
      .toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    setCheckoutTotal(formattedPrice);

    return formattedPrice;
  };

  return (
    <div data-testid="customer_element-order-table">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-Total</th>
            <th>Remover item</th>
          </tr>
        </thead>
        <tbody>
          { products.map((product, index) => (
            <tr key={ index + 1 }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-name-${index}`
                }
              >
                { product.name }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                { product.quantity }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {
                  `${(parseFloat(product.price))
                    .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {
                  `${(parseFloat(product.price * product.quantity))
                    .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-remove-${index}`
                }
              >
                <button
                  type="button"
                  onClick={ () => onRemove(product.id) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h4>Total:</h4>
        <h3 data-testid="customer_checkout__element-order-total-price">
          {`${
            getTotalPrice()
          }`}
        </h3>
      </div>
    </div>
  );
}

CheckoutTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CheckoutTable;
