import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Context from '../context/context';
import { requestSales, requestUpdateStatus, requestUsers } from '../services/requests';

export default function DetailsOrders() {
  const [orders, setOrder] = useState([{}]);
  const [loaded, setLoaded] = useState(false);
  const [seller, setSeller] = useState(false);
  const { orderResponse } = useContext(Context);
  const [reload, setReload] = useState(0);

  const params = useParams();

  useEffect(() => {
    const fetchSales = async () => {
      const products = await requestSales();
      const salesOfSeller = products.find((item) => item.id === Number(params.id));
      const { sellerId } = salesOfSeller;
      const userRequested = await requestUsers(Number(sellerId));
      setSeller(userRequested);
      setOrder(salesOfSeller);
      setLoaded(true);
    };
    fetchSales();
  }, [params.id, orderResponse, reload, loaded]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  const handleDelivered = () => {
    const body = {
      status: 'Entregue',
    };
    const endpoint = `http://localhost:3001/sales/status/${params.id}`;
    const fetchProducts = async () => {
      const products = await requestUpdateStatus(endpoint, body);
      setReload(1);
      return products;
    };
    fetchProducts();
  };

  const dataTestPrefix = 'customer_order_details__';
  const dataTestPrefix2 = 'customer_order_details__element-order-details-label-delivery';

  return (
    <div>
      <NavBar />
      {loaded ? (
        <div>
          <div className="Topo da tabela">
            <h2
              data-testid={ `${dataTestPrefix}element-order-details-label-order-id` }
              id={ orders.id }
            >
              ID da compra:
              <br />
              {orders.id}
            </h2>
            <h2
              data-testid={
                `${dataTestPrefix}element-order-details-label-seller-name`
              }
              id={ orders.id }
            >
              Vendedor:
              <br />
              {seller.name}
            </h2>
            <h2
              data-testid={
                `${dataTestPrefix}element-order-details-label-order-date`
              }
              id={ orders.id }
            >
              Data da compra:
              <br />
              {formatDate(orders.saleDate)}
            </h2>
            <h2
              data-testid={ `${dataTestPrefix2}-status-${orders.id}` }
              id={ orders.id }
            >
              <br />
              { orders.status }
            </h2>
            <button
              type="button"
              data-testid="customer_order_details__button-delivery-check"
              onClick={ () => handleDelivered() }
              disabled={ orders.status !== 'Em Trânsito' }
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
              {orders.products.map((product, index) => {
                const itemName = product ? product.name : undefined;
                const itemPrice = product ? product.price : undefined;
                const subTotal = product ? (
                  parseFloat(product.price * product.SalesProducts.quantity)
                    .toLocaleString('pt-BR', { minimumFractionDigits: 2 }))
                  : undefined;
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
                      {parseFloat(itemPrice)
                        .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td
                      data-testid={
                        `${dataTestPrefix}element-order-table-sub-total-${index}`
                      }
                    >
                      { parseFloat(subTotal)
                        .toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="Valor Total">
            <p
              data-testid="customer_order_details__element-order-total-price"
              id={ orders.id }
            >
              { parseFloat(orders.totalPrice)
                .toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }
            </p>
          </div>
        </div>
      )
        : (
          <div>Loading</div>
        )}
    </div>
  );
}
