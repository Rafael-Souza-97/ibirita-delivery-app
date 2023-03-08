import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { requestSales, requestUpdateStatus } from '../services/requests';

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
      console.log(salesOfSeller);
      setOrder(salesOfSeller);
      setLoaded(true);
    };
    fetchSales();
  }, [params.id, reload, loaded]);

  const handlePreparing = () => {
    const body = {
      status: 'Preparando',
    };
    const endpoint = `http://localhost:3001/sales/status/${params.id}`;
    const fetchProducts = async () => {
      const products = await requestUpdateStatus(endpoint, body);
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
    const endpoint = `http://localhost:3001/sales/status/${params.id}`;
    const fetchProducts = async () => {
      const products = await requestUpdateStatus(endpoint, body);
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
        <div key={ orders.id }>
          <div className="Topo da tabela">
            <h2
              data-testid={ `${prefix}element-order-details-label-order-id` }
              id={ orders.id }
            >
              ID da compra:
              <br />
              {orders.id}
            </h2>
            <h2
              data-testid={ `${prefix}element-order-details-label-order-date` }
              id={ orders.id }
            >
              <br />
              {formatDate(orders.saleDate)}
            </h2>
            <h2
              data-testid={ `${prefixStatus}` }
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
                    {product.price}
                  </td>
                  <td
                    data-testid={
                      `${prefix}element-order-table-sub-total-${index}`
                    }
                  >
                    { (product.SalesProducts.quantity * product.price).toFixed(2) }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="Valor Total">
            <p
              data-testid="seller_order_details__element-order-total-price"
              id={ orders.id }
            >
              <br />
              {parseFloat(orders.totalPrice)
                .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
