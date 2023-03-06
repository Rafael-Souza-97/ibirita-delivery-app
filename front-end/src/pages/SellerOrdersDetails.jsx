import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Context from '../context/context';
import mock from '../MOCKS/OREDERSUSER';
import { NUMBER_TEN } from '../utils/NumberConsts';

const prefix = 'seller_order_details__';
const prefixStatus = 'seller_order_details__element-order-details-label-delivery-status';

export default function SellerOrdersDetails() {
  const [orders, setOrder] = useState([{}]);
  const [loaded, setLoaded] = useState(false);
  const { productsArray } = useContext(Context);
  const params = useParams();

  useEffect(() => {
    const orderNumber = mock.find((item) => item.id
    === Number(params.id));
    setLoaded(true);
    setOrder([orderNumber]);
  }, []);

  const handlePreparing = (id) => {
    const idNumber = Number(id);
    const status = 'Preparando';
    const url = `sales/status/${idNumber}`;
    console.log({
      status,
      url,
    });
    console.log(orders[0].status);
    const copyOrders = orders;
    copyOrders[0].status = 'preparing';

    setOrder([copyOrders]);
  };

  const handleDispatch = (id) => {
    const idNumber = Number(id);
    const status = 'Em Trânsito';
    console.log(`O pedido numbero: ${idNumber} já estamos ${status}`);
  };

  console.log(orders);

  return (
    <div>
      <NavBar />
      {loaded ? (
        orders.map((order) => (
          <div key={ order.id }>
            <div className="Topo da tabela">
              <h2
                data-testid={ `${prefix}element-order-details-label-order-${order.id}` }
                id={ order.id }
              >
                ID da compra:
                <br />
                {order.id}
              </h2>
              <h2
                data-testid={ `${prefix}element-order-date-${order.id}` }
                id={ order.id }
              >
                Data da compra:
                <br />
                {order.saleDate.substring(0, NUMBER_TEN)}
              </h2>
              <h2
                data-testid={ `${prefixStatus}-${order.id}` }
                id={ order.id }
              >
                Status da compra:
                <br />
                {order.status}
              </h2>
              <button
                type="button"
                data-testid="seller_order_details__button-preparing-check"
                onClick={ (e) => handlePreparing(e.target.id) }
                id={ order.id }
              >
                Preparar Pedido
              </button>
              <button
                type="button"
                data-testid="seller_order_details__button-dispatch-check"
                id={ order.id }
                onClick={ (e) => handleDispatch(e.target.id) }
                disabled={ order.status !== 'preparing' }
              >
                Saiu para entrega
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
                          `${prefix}element-order-table-item-numbers-${index}`
                        }
                      >
                        {index + 1}
                      </td>
                      <td
                        data-testid={
                          `${prefix}element-order-table-name-${index}`
                        }
                      >
                        {itemName}
                      </td>
                      <td
                        data-testid={
                          `${prefix}element-order-table-quantity-${index}`
                        }
                      >
                        {product.quantity}
                      </td>
                      <td
                        data-testid={
                          `${prefix}element-order-table-unit-price-${index}`
                        }
                      >
                        {itemPrice}
                      </td>
                      <td
                        data-testid={
                          `${prefix}element-order-table-sub-total-${index}`
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
                data-testid="seller_order_details__element-order-total-price"
                id={ order.id }
              >
                Valor Total:
                <br />
                {order.totalPrice}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
