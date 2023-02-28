import React from 'react';

export default function NavBar() {
  const userJson = localStorage.getItem('user');
  const { data } = JSON.parse(userJson);
  return (
    <div>
      <nav>
        <ul>
          <li
            data-testid="customer_products__element-navbar-link-products"
          >
            <a href="/">
              Produtos
            </a>
          </li>
          <li
            data-testid="customer_products__element-navbar-link-orders"
          >
            <a href="/">
              Meus Pedidos
            </a>
          </li>
          <li
            data-testid="customer_products__element-navbar-user-full-name"
          >
            <a href="/">
              {data.name}
            </a>
          </li>
          <li
            data-testid="customer_products__element-navbar-link-logout"
          >
            <a href="/">
              Sair
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
