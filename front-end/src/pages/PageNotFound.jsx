import React from 'react';
import { useHistory } from 'react-router-dom';

function PageNotFound() {
  const history = useHistory();
  const userJson = JSON.parse(localStorage.getItem('user'));

  const handleClick = async () => {
    if (userJson) {
      const { role } = userJson;
      switch (role) {
      case 'seller':
        history.push('/seller/orders');
        break;
      case 'administrator':
        history.push('/admin/manage');
        break;
      case 'customer':
        history.push('/customer/products');
        break;
      default:
        history.push('/login');
        break;
      }
    } else {
      history.push('/login');
    }
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">
        A página que você esta procurando nao foi encontrada
      </h1>

      <button
        className="not-found-title"
        type="button"
        onClick={ handleClick }
      >
        Voltar ao iBirit@
      </button>
    </div>
  );
}

export default PageNotFound;
