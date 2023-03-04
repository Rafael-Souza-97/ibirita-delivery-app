import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/context';
import '../styles/CheckoutTable.css';

function CheckoutTable({ products, onRemove }) {
  const { setCheckoutTotal, cartProducts, setCartProducts } = useContext(Context);

  console.log(cartProducts);

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

  const handleRemoveProduct = (productId) => {
    const newCartProducts = cartProducts.filter((product) => product.id !== productId);
    setCartProducts(newCartProducts);
    onRemove(productId);
  };

  return (
    <div
      className="checkout-table__order-table"
      data-testid="customer_element-order-table"
    >
      <table className="checkout-table__table">
        <thead>
          <tr>
            <th className="checkout-table__header">Item</th>
            <th className="checkout-table__header">Descrição</th>
            <th className="checkout-table__header">Quantidade</th>
            <th className="checkout-table__header">Valor Unitário</th>
            <th className="checkout-table__header">Sub-Total</th>
            <th className="checkout-table__header">Remover item</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={ index + 1 }>
              <td
                className="checkout-table__data"
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                className="checkout-table__data"
                data-testid={ `customer_checkout__element-order-table-name-${index}` }
              >
                {product.name}
              </td>
              <td
                className="checkout-table__data"
                data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
              >
                {product.quantity}
              </td>
              <td
                className="checkout-table__data"
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {`${(parseFloat(product.price)).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}`}
              </td>
              <td
                className="checkout-table__data"
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {`${(parseFloat(product.price * product.quantity)).toLocaleString(
                  'pt-BR',
                  { minimumFractionDigits: 2 },
                )}`}
              </td>
              <td
                className="checkout-table__data"
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
              >
                <button
                  type="button"
                  onClick={ () => handleRemoveProduct(product.id) }
                  className="checkout-table__button"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="checkout-table__order-summary">
        <h4 className="checkout-table__order-summary__title">Total:</h4>
        <h3
          className="checkout-table__order-summary__price"
          data-testid="customer_checkout__element-order-total-price"
        >
          {`${getTotalPrice()}`}
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
