import React from 'react';
import { useHistory } from 'react-router-dom';

export default function NavBar() {
  const userJson = localStorage.getItem('user');
  const data = JSON.parse(userJson);
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <div>
      <nav>
        <ul>
          <li
            data-testid="customer_products__element-navbar-link-products"
          >
            <button
              type="button"
              onClick={ () => history.push('/customer/products') }
            >
              Produtos
            </button>
          </li>
          <li>
            <button
              data-testid="customer_products__element-navbar-link-orders"
              type="button"
              onClick={ () => history.push('/customer/orders') }
            >
              Meus Pedidos
            </button>
          </li>
          <li
            data-testid="customer_products__element-navbar-user-full-name"
          >
            {data.name}
          </li>
          <li>
            <button
              data-testid="customer_products__element-navbar-link-logout"
              type="button"
              onClick={ logout }
            >
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
