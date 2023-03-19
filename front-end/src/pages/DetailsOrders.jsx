import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Context from '../context/context';
import { requestSales, requestUpdateStatus, requestUserById } from '../services/requests';
import '../styles/DatailsOrders.css';

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
      const userRequested = await requestUserById(Number(sellerId));
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
    const body = { status: 'Entregue' };
    const fetchProducts = async () => {
      const products = await requestUpdateStatus(params.id, body);
      setReload(1);
      return products;
    };
    fetchProducts();
  };

  const dataTestPrefix = 'customer_order_details__';
  const dataTestPrefix2 = 'customer_order_details__element-order-details-label-delivery';

  return (
    <div className="body">
      <NavBar />
      {loaded ? (
        <div className="orders_body">
          <div className="Topo_da_tabela">
            <h2
              data-testid={ `${dataTestPrefix}element-order-details-label-order-id` }
              id={ orders.id }
            >
              {orders.id}
            </h2>
            <h2
              data-testid={
                `${dataTestPrefix}element-order-details-label-seller-name`
              }
              id={ orders.id }
            >
              {seller.name}
            </h2>
            <h2
              data-testid={
                `${dataTestPrefix}element-order-details-label-order-date`
              }
              id={ orders.id }
            >
              {formatDate(orders.saleDate)}
            </h2>
            <h2
              data-testid={ `${dataTestPrefix2}-status-${orders.id}` }
              id={ orders.id }
            >
              { orders.status }
            </h2>
            <button
              className="button-delivered"
              type="button"
              data-testid="customer_order_details__button-delivery-check"
              onClick={ () => handleDelivered() }
              disabled={ orders.status !== 'Em Trânsito' }
            >
              Marcar como entregue
            </button>
          </div>
          <table className="Tabela_de_produtos">
            <thead>
              <tr>
                <th className="py-3 px-6 text-center uppercase font-semibold text-sm">
                  Item
                </th>
                <th className="py-3 px-6 text-center uppercase font-semibold text-sm">
                  Descrição
                </th>
                <th className="py-3 px-6 text-center uppercase font-semibold text-sm">
                  Quantidade
                </th>
                <th className="py-3 px-6 text-center uppercase font-semibold text-sm">
                  Valor Unitário
                </th>
                <th className="py-3 px-6 text-center uppercase font-semibold text-sm">
                  Sub-Total
                </th>
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
                      className="py-4 px-6 text-center"
                      data-testid={
                        `${dataTestPrefix}element-order-table-item-number-${index}`
                      }
                    >
                      {index + 1}
                    </td>
                    <td
                      className="py-4 px-6 text-center"
                      data-testid={
                        `customer_order_details__element-order-table-name-${index}`
                      }
                    >
                      {itemName}
                    </td>
                    <td
                      className="py-4 px-6 text-center"
                      data-testid={
                        `${dataTestPrefix}element-order-table-quantity-${index}`
                      }
                    >
                      {product.SalesProducts.quantity}
                    </td>
                    <td
                      className="py-4 px-6 text-center"
                      data-testid={
                        `${dataTestPrefix}element-order-table-unit-price-${index}`
                      }
                    >
                      { 'R$ ' }
                      {parseFloat(itemPrice)
                        .toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td
                      className="py-4 px-6 text-center"
                      data-testid={
                        `${dataTestPrefix}element-order-table-sub-total-${index}`
                      }
                    >
                      { 'R$ ' }
                      { subTotal}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="Valor_Total">
            <h2
              data-testid="customer_order_details__element-order-total-price"
              id={ orders.id }
            >
              <strong>
                { 'R$ ' }
                { parseFloat(orders.totalPrice)
                  .toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }
              </strong>
            </h2>
          </div>
        </div>
      )
        : (
          <div>Loading...</div>
        )}
    </div>
  );
}
