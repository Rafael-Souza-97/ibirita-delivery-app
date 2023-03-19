import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/context';
import ibirita from '../images/ibirita.png';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setIsLoged } = useContext(Context);
  const userJson = localStorage.getItem('user');
  const data = JSON.parse(userJson);
  const history = useHistory();

  const logout = () => {
    setIsLoged(false);
    localStorage.clear();
    history.push('/login');
  };

  const handleOrders = () => {
    const { role } = JSON.parse(userJson);
    switch (role) {
    case 'seller':
      return history.push('/seller/orders');
    case 'administrator':
      return history.push('/admin/manage');
    default:
      return history.push('/customer/orders');
    }
  };

  return (
    <header className="flex flex-col md:flex-1 md:items-center md:justify-between items-center justify-between bg-corHeader text-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex mx-14 cursor-pointer hover:opacity-100 opacity-90">
          <img className="h-28 w-56" src={ ibirita } alt="Ibirita Logo" />
        </div>

        <div
          className="
          hidden md:flex lg:ml-24 xl:ml-40 space-x-4 font-glacial-bold text-lg items-center
          "
        >
          <button
            className="hover:text-corBotao mx-4 items-center"
            type="button"
            onClick={ () => history.push('/customer/products') }
          >
            Produtos
          </button>
          <button
            className="hover:text-corBotao mx-4"
            data-testid="customer_products__element-navbar-link-orders"
            type="button"
            onClick={ () => handleOrders() }
          >
            Meus Pedidos
          </button>
        </div>

        <div className="hidden lg:ml-24 xl:ml-40 md:block">
          <div
            className="ml-4
             flex items-center md:ml-6 font-glacial-bold text-lg text-center"
          >
            <div
              className="
              font-glacial-bold text-lg hover:text-corBotao mx-4 cursor-pointer"
            >
              {data.name}
            </div>
            <button
              className="hover:text-red-500 mx-4"
              data-testid="customer_products__element-navbar-link-logout"
              type="button"
              onClick={ logout }
            >
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Hamburguer Menu */}
      <div className="mr-2 flex flex-col lg:hidden justify-center">
        <button
          type="button"
          onClick={ () => setIsMenuOpen(!isMenuOpen) }
          className="
          block sm:hidden w-10 h-10 text-white p-2 focus:outline-none focus:bg-gray-700"
          aria-label="Main menu"
          aria-expanded={ isMenuOpen }
        >
          <svg
            className="h-6 w-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={ 2 }
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      <div className={ `${isMenuOpen ? '' : 'hidden'} lg:hidden` }>
        <div className="pt-2 pb-3 items-center text-center justify-center">
          <button
            type="button"
            onClick={ () => history.push('/customer/products') }
            className="
            block px-3 py-2 rounded-md text-base
            font-medium text-white hover:text-corBotao"
          >
            Produtos
          </button>
          <button
            type="button"
            onClick={ () => handleOrders() }
            className="block px-3 py-2
            rounded-md text-base font-medium text-white hover:text-corBotao"
          >
            Meus Pedidos
          </button>
          <button
            type="button"
            onClick={ () => history.push('/customer/profile') }
            className="
            block px-3 py-2 rounded-md text-base
            font-medium text-white hover:text-corBotao"
          >
            Perfil
          </button>
          <button
            type="button"
            onClick={ logout }
            className="
            block px-3 py-2 rounded-md text-base
            font-medium text-white hover:text-red-500"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}
