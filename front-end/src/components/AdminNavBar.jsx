import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/context';
import ibirita from '../images/ibirita.png';
// import '../styles/NavBar.css';

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
    <div className="flex flex-col md:flex-row items-center justify-between bg-corHeader text-white">
      <div className="flex mx-4 md:mx-14 cursor-pointer hover:opacity-100 opacity-90">
        <img className="h-28 md:h-auto md:w-56" src={ ibirita } alt="Ibirita Logo" />
      </div>
      <nav className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6">
        <ul className="nav-list-left">
          <li className="ml-4 md:ml-24 xl:ml-40 space-x-4 font-glacial-bold text-lg items-center" data-testid="customer_products__element-navbar-link-orders">
            <button className="hover:text-corBotao mx-4 items-center" type="button" onClick={ () => history.push('/admin/manage') }>
              GERENCIAR USUÁRIOS
            </button>
          </li>
        </ul>
      </nav>
      <nav className="navbar-right pb-4 md:pb-0">
        <ul className="ml-4 flex items-center md:ml-6 font-glacial-bold text-lg">
          <li className="font-glacial-bold text-lg hover:text-corBotao mx-4 cursor-pointer" data-testid="customer_products__element-navbar-user-full-name">
            {data.name}
          </li>
          <li className="nav-item">
            <button className="hover:text-red-500 mx-4" data-testid="customer_products__element-navbar-link-logout" type="button" onClick={ logout }>
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </div>

  );
}
