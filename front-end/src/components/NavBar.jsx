import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/NavBar.css';

export default function NavBar() {
  const userJson = localStorage.getItem('user');
  const data = JSON.parse(userJson);
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <div className="header">
      <nav className="navbar-left">
        <ul className="nav-list-left">
          <li
            className="nav-item"
            data-testid="customer_products__element-navbar-link-products"
          >
            <button
              className="nav-button"
              type="button"
              onClick={ () => history.push('/customer/products') }
            >
              Produtos
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-button"
              data-testid="customer_products__element-navbar-link-orders"
              type="button"
              onClick={ () => history.push('/customer/orders') }
            >
              Meus Pedidos
            </button>
          </li>
        </ul>
      </nav>

      <nav className="navbar-right">
        <ul className="nav-list-right">
          <li
            className="nav-item"
            data-testid="customer_products__element-navbar-user-full-name"
          >
            {data.name}
          </li>
          <li className="nav-item">
            <button
              className="nav-button"
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
