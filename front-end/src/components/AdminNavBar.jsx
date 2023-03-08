import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/context';
import '../styles/NavBar.css';

export default function NavBar() {
  const { setIsLoged } = useContext(Context);
  const userJson = localStorage.getItem('user');
  const data = JSON.parse(userJson);

  const history = useHistory();

  const logout = () => {
    setIsLoged(false);
    localStorage.clear();
    history.push('/login');
  };

  return (
    <div className="header">
      <nav className="navbar-left">
        <ul className="nav-list-left">
          <li
            className="nav-item"
            data-testid="customer_products__element-navbar-link-orders"
          >
            <button
              className="nav-button"
              type="button"
              onClick={ () => history.push('/admin/manage') }
            >
              GERENCIAR USUÁRIOS
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
            { data.name }
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
