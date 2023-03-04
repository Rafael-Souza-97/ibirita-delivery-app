import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Context from '../context/context';

export default function Orders() {
  const { orderResponse } = useContext(Context);
  const history = useHistory();

  if (!orderResponse) history.push('/customer/products');

  console.log(orderResponse);
  const [pedidos, setPedidos] = useState(orderResponse);
  const [loaded, setLoaded] = useState();

  const handleClick = (e) => {
    const numberId = Number(e.target.id);
    history.push(`/customer/orders/${numberId}`);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }

  useEffect(() => {
    setPedidos(orderResponse);
    setLoaded(true);
  }, []);

  console.log('MEUS PEDIDOS ---> ', pedidos.map((orders) => orders.id));

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
                { formatDate(orders.saleDate) }
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
                { orders.totalPrice }
              </p>
            </button>
          ))
          : <h1>Loadin</h1>}
      </div>
    </div>
  );
}
