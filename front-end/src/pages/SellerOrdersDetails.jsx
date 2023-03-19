import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { requestSales, requestUpdateStatus } from '../services/requests';
import '../styles/DatailsOrders.css';

const prefix = 'seller_order_details__';
const prefixStatus = 'seller_order_details__element-order-details-label-delivery-status';

export default function SellerOrdersDetails() {
  const [orders, setOrder] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [reload, setReload] = useState(0);

  const params = useParams();

  useEffect(() => {
    const fetchSales = async () => {
      const products = await requestSales();
      const salesOfSeller = products.find((item) => item.id === Number(params.id));
      setOrder(salesOfSeller);
      setLoaded(true);
    };
    fetchSales();
  }, [params.id, reload, loaded]);

  const handlePreparing = () => {
    const body = {
      status: 'Preparando',
    };

    const fetchProducts = async () => {
      const products = await requestUpdateStatus(params.id, body);
      return products;
    };
    setLoaded(false);
    setReload(1);
    fetchProducts();
  };

  const handleDispatch = () => {
    const body = {
      status: 'Em Trânsito',
    };

    const fetchProducts = async () => {
      const products = await requestUpdateStatus(params.id, body);
      return products;
    };
    setLoaded(false);
    setReload(2);
    fetchProducts();
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  return (
    <div>
      <NavBar />
      {loaded ? (
        <div
          key={ orders.id }
          className="orders_body"
        >
          <div className="Topo_da_tabela">
            <h2
              data-testid={ `${prefix}element-order-details-label-order-id` }
              id={ orders.id }
            >
              {orders.id}
            </h2>
            <h2
              data-testid={ `${prefix}element-order-details-label-order-date` }
              id={ orders.id }
            >
              {formatDate(orders.saleDate)}
            </h2>
            <h2
              data-testid={ `${prefixStatus}` }
              id={ orders.id }
            >
              <strong>
                {orders.status}
              </strong>
            </h2>
            <button
              type="button"
              className="preparing_button"
              data-testid="seller_order_details__button-preparing-check"
              onClick={ () => handlePreparing() }
              id={ orders.id }
              disabled={ orders.status !== 'Pendente' }
            >
              Preparar Pedido
            </button>
            <button
              type="button"
              className="deivery_button"
              data-testid="seller_order_details__button-dispatch-check"
              id={ orders.id }
              onClick={ () => handleDispatch() }
              disabled={ orders.status !== 'Preparando' }
            >
              Saiu para entrega
            </button>
          </div>
          <table className="Tabela_de_produtos">
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
              {orders.products.map((product, index) => (
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
                    {product.name}
                  </td>
                  <td
                    data-testid={
                      `${prefix}element-order-table-quantity-${index}`
                    }
                  >
                    {product.SalesProducts.quantity}
                  </td>
                  <td
                    data-testid={
                      `${prefix}element-order-table-unit-price-${index}`
                    }
                  >
                    { 'R$ ' }
                    {
                      parseFloat(product.price)
                        .toLocaleString('pt-BR', { minimumFractionDigits: 2 })
                    }
                  </td>
                  <td
                    data-testid={
                      `${prefix}element-order-table-sub-total-${index}`
                    }
                  >
                    { 'R$ ' }
                    { parseFloat(product.SalesProducts.quantity * product.price)
                      .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="Valor_Total">
            <h2
              data-testid="seller_order_details__element-order-total-price"
              id={ orders.id }
            >
              <strong>

                { 'R$ ' }
                {parseFloat(orders.totalPrice)
                  .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </strong>
            </h2>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
