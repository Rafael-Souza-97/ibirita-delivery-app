import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Context from '../context/context';
import mock from '../MOCKS/OREDERSUSER';
import users from '../MOCKS/USERS';
import { NUMBER_TEN } from '../utils/NumberConsts';

export default function DetailsOrders() {
  const [orders, setOrder] = useState([{}]);
  const [loaded, setLoaded] = useState(false);
  const { productsArray, checkoutResponse } = useContext(Context);
  const params = useParams();

  console.log(checkoutResponse);

  useEffect(() => {
    const orderNumber = mock.find((item) => item.id
    === Number(params.id));
    setLoaded(true);
    setOrder([orderNumber]);
  }, []);

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
                  data-testid={ `customer_order_details__
                  element-order-details-label-order-${order.id}` }
                  id={ order.id }
                >
                  ID da compra:
                  <br />
                  {order.id}
                </h2>
                <h2
                  data-testid={ `customer_order_details__
                  element-order-details-label-seller-name` }
                  id={ order.id }
                >
                  Vendedor:
                  <br />
                  {seller}
                </h2>
                <h2
                  data-testid={ `customer_orders__element-order-date-${order.id}` }
                  id={ order.id }
                >
                  Data da compra:
                  <br />
                  {order.saleDate.substring(0, NUMBER_TEN)}
                </h2>
                <h2
                  data-testid={ `customer_order_details__
                  element-order-details-label-delivery-status${order.id}` }
                  id={ order.id }
                >
                  Status da compra:
                  <br />
                  {order.status}
                </h2>
                <button
                  type="button"
                  data-testid="customer_order_details__button-delivery-check"
                  onClick={ () => console.log('clicou em mim') }
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
                    const item = productsArray.find((element) => element.id
                    === product.productId);
                    const itemName = item ? item.name : undefined;
                    const itemPrice = item ? item.price : undefined;
                    const subTotal = item ? (item.price * product.quantity)
                      .toFixed(2) : undefined;
                    return (
                      <tr key={ index + 1 }>
                        <td
                          data-testid={
                            `customer_order_details__element-order-table-item-number
                            -${index}`
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
                            `customer_order_details__
                            element-order-table-quantity-${index}`
                          }
                        >
                          {product.quantity}
                        </td>
                        <td
                          data-testid={
                            `ustomer_order_details__element-order-table-
                            unit-price-${index}`
                          }
                        >
                          {itemPrice}
                        </td>
                        <td
                          data-testid={
                            `customer_order_details__element-order-table-sub-total
                            -${index}`
                          }
                        >
                          {subTotal}
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
                  Valor Total:
                  <br />
                  {order.totalPrice}
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
