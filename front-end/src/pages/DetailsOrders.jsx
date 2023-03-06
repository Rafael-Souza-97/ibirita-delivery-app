import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Context from '../context/context';
import users from '../MOCKS/USERS';

export default function DetailsOrders() {
  const [orders, setOrder] = useState([{}]);
  const [loaded, setLoaded] = useState(false);
  const { orderResponse } = useContext(Context);
  const params = useParams();

  console.log('CHECKOUT RESPONSE -->', orderResponse);

  useEffect(() => {
    const orderNumber = orderResponse.find((item) => item.id
    === Number(params.id));
    setLoaded(true);
    setOrder([orderNumber]);
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  const dataTestPrefix = 'customer_order_details__';
  const dataTestPrefix2 = 'customer_order_details__element-order-details-label-delivery';

  return (
    <div>
      <NavBar />
      {loaded ? (
        orders.map((order) => {
          const seller = users.map((item) => (Number(item.id)
          === Number(order.sellerId)
            ? item.name : undefined));
          return (
            <div key={ order.id }>
              <div className="Topo da tabela">
                <h2
                  data-testid={ `${dataTestPrefix}element-order-details-label-order-id` }
                  id={ order.id }
                >
                  ID da compra:
                  <br />
                  {order.id}
                </h2>
                <h2
                  data-testid={
                    `${dataTestPrefix}element-order-details-label-seller-name`
                  }
                  id={ order.id }
                >
                  Vendedor:
                  <br />
                  {seller}
                </h2>
                <h2
                  data-testid={
                    `${dataTestPrefix}element-order-details-label-order-date`
                  }
                  id={ order.id }
                >
                  Data da compra:
                  <br />
                  {formatDate(order.saleDate)}
                </h2>
                <h2
                  data-testid={ `${dataTestPrefix2}-status-${order.id}` }
                  id={ order.id }
                >
                  Status da compra:
                  <br />
                  { order.status }
                </h2>
                <button
                  type="button"
                  data-testid="customer_order_details__button-delivery-check"
                  onClick={ () => console.log('clicou em mim') }
                  disabled
                >
                  Marcar como entregue
                </button>
              </div>
              <table className="Tabela de produtos">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Descrição</th>
                    <th>Quantidade</th>
                    <th>Valor Unitário</th>
                    <th>Sub-Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product, index) => {
                    const itemName = product ? product.name : undefined;
                    const itemPrice = product ? product.price : undefined;
                    const subTotal = product ? (
                      product.price * product.SalesProducts.quantity)
                      .toFixed(2) : undefined;
                    return (
                      <tr key={ index + 1 }>
                        <td
                          data-testid={
                            `${dataTestPrefix}element-order-table-item-number-${index}`
                          }
                        >
                          {index + 1}
                        </td>
                        <td
                          data-testid={
                            `customer_order_details__element-order-table-name-${index}`
                          }
                        >
                          {itemName}
                        </td>
                        <td
                          data-testid={
                            `${dataTestPrefix}element-order-table-quantity-${index}`
                          }
                        >
                          {product.SalesProducts.quantity}
                        </td>
                        <td
                          data-testid={
                            `${dataTestPrefix}element-order-table-unit-price-${index}`
                          }
                        >
                          {itemPrice}
                        </td>
                        <td
                          data-testid={
                            `${dataTestPrefix}element-order-table-sub-total-${index}`
                          }
                        >
                          { subTotal }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="Valor Total">
                <p
                  data-testid="customer_order_details__element-order-total-price"
                  id={ order.id }
                >
                  { order.totalPrice }
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
