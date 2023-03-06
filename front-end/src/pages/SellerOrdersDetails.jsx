import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Context from '../context/context';
import mock from '../MOCKS/OREDERSUSER';
import { requestData, requestUpdateStatus } from '../services/requests';

const prefix = 'seller_order_details__';
const prefixStatus = 'seller_order_details__element-order-details-label-delivery-status';

export default function SellerOrdersDetails() {
  const [orders, setOrder] = useState({});
  const [loaded, setLoaded] = useState(0);
  const [reload, setReload] = useState(false);

  const { productsArray } = useContext(Context);
  const params = useParams();

  console.log(productsArray);

  useEffect(() => {
    const orderNumber = mock.find((item) => item.id
    === Number(params.id));
    setOrder(orderNumber);
    const endpoint = `http://localhost:3001/sales/${params.id}`;
    const { token } = JSON.parse(localStorage.getItem('user'));
    const fetchProducts = async () => {
      const products = await requestData(endpoint, token);
      setOrder(products);
    };
    fetchProducts();
    setLoaded(true);
  }, [params.id, reload]);

  const handlePreparing = () => {
    const body = {
      status: 'Preparando',
    };
    const endpoint = `http://localhost:3001/sales/status/${params.id}`;
    const fetchProducts = async () => {
      const products = await requestUpdateStatus(endpoint, body);
      return products;
    };
    fetchProducts();
    setReload(1);
  };

  const handleDispatch = () => {
    const body = {
      status: 'Em Trânsito',
    };
    const endpoint = `http://localhost:3001/sales/status/${params.id}`;
    const fetchProducts = async () => {
      const products = await requestUpdateStatus(endpoint, body);
      return products;
    };
    fetchProducts();
    setReload(2);
    setReload(true);
  };

  return (
    <div>
      <NavBar />
      {loaded ? (
        <div key={ orders.id }>
          <div className="Topo da tabela">
            <h2
              data-testid={ `${prefix}element-order-details-label-order-${orders.id}` }
              id={ orders.id }
            >
              ID da compra:
              <br />
              {orders.id}
            </h2>
            <h2
              data-testid={ `${prefix}element-order-date-${orders.id}` }
              id={ orders.id }
            >
              Data da compra:
              <br />
              {orders.saleDate}
            </h2>
            <h2
              data-testid={ `${prefixStatus}-${orders.id}` }
              id={ orders.id }
            >
              Status da compra:
              <br />
              {orders.status}
            </h2>
            <button
              type="button"
              data-testid="seller_order_details__button-preparing-check"
              onClick={ () => handlePreparing() }
              id={ orders.id }
              disabled={ orders.status !== 'Pendente' }
            >
              Preparar Pedido
            </button>
            <button
              type="button"
              data-testid="seller_order_details__button-dispatch-check"
              id={ orders.id }
              onClick={ () => handleDispatch() }
              disabled={ orders.status !== 'Preparando' }
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
            {/* <tbody>
              {orders.products.map((product, index) => {
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
            </tbody> */}
          </table>
          <div className="Valor Total">
            <p
              data-testid="seller_order_details__element-order-total-price"
              id={ orders.id }
            >
              Valor Total:
              <br />
              {orders.totalPrice}
            </p>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
