import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Context from '../context/context';
import { requestLogin } from '../services/requests';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registration, setRegistration] = useState(false);
  const [invisibleElement, setInvisibleElement] = useState(false);
  const { isLoged, setIsLoged } = useContext(Context);

  const history = useHistory();

  const userJson = localStorage.getItem('user');
  const userData = userJson ? JSON.parse(userJson) : null;
  const roleUser = userData ? userData.role : null;

  useEffect(() => {
    if (userData) {
      setIsLoged(true);
    }
  }, [userData, setIsLoged]);

  const handleEmail = ({ target: { value } }) => setEmail(value);

  const handlePassword = ({ target: { value } }) => setPassword(value);

  const validUser = () => {
    const minPassword = 6;
    const emailTest = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    return emailTest && password.length >= minPassword;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = { email, password };
      const data = await requestLogin(body);
      localStorage.setItem('user', JSON.stringify(data));
      const userLocalStorage = localStorage.getItem('user');
      const user = JSON.parse(userLocalStorage);
      const { role } = user;
      switch (role) {
      case 'seller':
        history.push('/seller/orders');
        break;
      case 'administrator':
        history.push('/admin/manage');
        break;
      default:
        history.push('/customer/products');
        break;
      }
    } catch (error) {
      setInvisibleElement(true);
    }
  };

  if (registration) {
    return <Redirect to="/register" />;
  }

  if (isLoged) {
    switch (roleUser) {
    case 'seller':
      return <Redirect to="/seller/orders" />;
    case 'administrator':
      return <Redirect to="/admin/manage" />;
    default:
      return <Redirect to="/customer/products" />;
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">
          Email:
          <input
            data-testid="common_login__input-email"
            type="email"
            id="email"
            value={ email }
            onChange={ handleEmail }
            placeholder="Login"
          />
        </label>
        <br />
        <label htmlFor="password">
          Senha:
          <input
            data-testid="common_login__input-password"
            type="password"
            id="password"
            value={ password }
            onChange={ handlePassword }
            placeholder="Senha"
          />
        </label>
        <br />
        <button
          data-testid="common_login__button-login"
          type="submit"
          disabled={ !validUser() }
        >
          Login
        </button>
        <button
          data-testid="common_login__button-register"
          type="button"
          onClick={ () => setRegistration(true) }
        >
          Ainda não tenho conta
        </button>
        {invisibleElement && (
          <p data-testid="common_login__element-invalid-email">
            E-mail ou Senha Invalidos
          </p>
        )}
      </form>
    </div>
  );
}
