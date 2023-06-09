import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { requestSales } from '../services/requests';
import '../styles/Orders.css';

export default function Orders() {
  const [sales, setSales] = useState([]);
  const history = useHistory();

  async function fetchSales() {
    const userJson = localStorage.getItem('user');
    const data = JSON.parse(userJson);
    const request = await requestSales();
    const userOrders = request.filter((item) => item.userId === data.id);
    setSales(userOrders);
  }

  useEffect(() => {
    fetchSales();
  }, []);

  const handleClick = (e) => {
    const numberId = Number(e.target.id);
    history.push(`/customer/orders/${numberId}`);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  if (sales.length === 0 || Object.keys(sales).length === 0) {
    return (
      <div>
        <NavBar />
        <div>
          <p>Nenhum produto foi encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="orders-page-container">
        { sales.map((orders) => (
          <div
            className="orders-page-orders-container"
            key={ orders.id }
            id={ orders.id }
            role="presentation"
            onClick={ (e) => handleClick(e) }
          >
            <p
              data-testid={ `customer_orders__element-order-id-${orders.id}` }
              id={ orders.id }
            >
              { orders.id }
            </p>
            <br />
            <h2
              data-testid={ `customer_orders__element-delivery-status-${orders.id}` }
              id={ orders.id }
            >
              { orders.status }
            </h2>
            <p
              data-testid={ `customer_orders__element-order-date-${orders.id}` }
              id={ orders.id }
            >
              { formatDate(orders.saleDate) }
            </p>
            <br />
            <h2
              data-testid={ `customer_orders__element-card-price-${orders.id}` }
              id={ orders.id }
            >
              { 'R$ ' }
              { parseFloat(orders.totalPrice)
                .toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
