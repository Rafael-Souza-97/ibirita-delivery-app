import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { requestData } from '../services/requests';
import { NUMBER_TEN } from '../utils/NumberConsts';

export default function SellerOrders() {
  const [pedidos, setPedidos] = useState([]);
  const [loaded, setLoaded] = useState();
  const history = useHistory();

  const handleClick = (e) => {
    const numberId = Number(e.target.id);
    history.push(`/seller/orders/${numberId}`);
  };

  useEffect(() => {
    const endpoint = 'http://localhost:3001/sales/';
    const { token, id } = JSON.parse(localStorage.getItem('user'));
    const fetchProducts = async () => {
      const products = await requestData(endpoint, token);
      const salesOfSeller = products.filter((item) => item.sellerId === id);
      setPedidos(salesOfSeller);
      setLoaded(true);
    };
    fetchProducts();
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
                data-testid={ `seller_orders__element-delivery-status-${orders.id}` }
                id={ orders.id }
              >
                { orders.status }
              </h2>
              <h2
                data-testid={ `seller_orders__element-order-date-${orders.id}` }
                id={ orders.id }
              >
                { orders.saleDate.substring(0, NUMBER_TEN) }
              </h2>
              <h2
                data-testid={ `seller_orders__element-order-id-${orders.id}` }
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
              <p
                data-testid={ `customer_orders__element-card-price-${orders.id}` }
                id={ orders.id }
              >
                {`${orders.deliveryAddress}, ${orders.deliveryNumber}`}
              </p>
            </button>
          ))
          : <h1>Loading</h1>}
      </div>
    </div>
  );
}
