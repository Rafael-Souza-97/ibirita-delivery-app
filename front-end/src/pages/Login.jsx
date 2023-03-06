import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../context/context';
import { requestLogin } from '../services/requests';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registration, setRegistration] = useState(false);
  const [invisibleElement, setInvisibleElement] = useState(false);
  const { isLoged, setIsLoged } = useContext(Context);

  const userJson = localStorage.getItem('user');
  const userData = JSON.parse(userJson);

  if (userData) setIsLoged(true);
  if (isLoged) return <Redirect to="/customer/products" />;
  if (registration) return <Redirect to="/register" />;

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
      const endpoint = 'http://localhost:3001/login';
      const body = { email, password };
      const data = await requestLogin(endpoint, body);
      localStorage.setItem('user', JSON.stringify(data));
      console.log('Login realizado com sucesso!');
      setIsLoged(true);
    } catch (error) {
      setInvisibleElement(true);
    }
  };

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
