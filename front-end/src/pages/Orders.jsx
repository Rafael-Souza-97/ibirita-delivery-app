import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import mock from '../MOCKS/OREDERSUSER';

export default function Orders() {
  const [pedidos, setPedidos] = useState();
  const [loaded, setLoaded] = useState();
  const history = useHistory();

  const handleClick = (e) => {
    const numberId = Number(e.target.id);
    history.push(`/customer/orders/${numberId}`);
  };

  useEffect(() => {
    setPedidos(mock);
    setLoaded(true);
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        { loaded
          ? pedidos.map((orders) => (
            <button
              key={ orders.id }
              type="button"
              className="product-card"
              id={ orders.id }
              onClick={ (e) => handleClick(e) }
            >
              <h2
                data-testid={ `customer_orders__element-delivery-status-${orders.id}` }
                id={ orders.id }
              >
                { orders.status }
              </h2>
              <h2
                data-testid={ `customer_orders__element-order-date-${orders.id}` }
                id={ orders.id }
              >
                { orders.saleDate }
              </h2>
              <h2
                data-testid={ `customer_orders__element-order-id-${orders.id}` }
                id={ orders.id }
              >
                { orders.id }
              </h2>
              <p
                data-testid={ `customer_orders__element-card-price-${orders.id}` }
                id={ orders.id }
              >
                {orders.totalPrice}
              </p>
            </button>
          ))
          : <h1>Loadin</h1>}
      </div>
    </div>
  );
}
