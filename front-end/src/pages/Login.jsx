import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import theme from '../themes/themes';
import ibirita from '../images/ibirita.png';
import Context from '../context/context';
import { requestLogin } from '../services/requests';
import '../index.css';
import '../styles/Login.css';

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
        return history.push('/seller/orders');
      case 'administrator':
        return history.push('/admin/manage');
      default:
        return history.push('/customer/products');
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
    <div className="min-h-screen bg-corFundo flex flex-col justify-center py-0 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto px-2 logo-ibirita">
        <img src={ ibirita } alt="ibirita-logo" />
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-3xl text-gray-900 my-5 font-glacial-bold">Acesse sua conta</h2>
          </div>

          <form onSubmit={ handleSubmit }>
            <div>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={ email }
                onChange={ handleEmail }
                placeholder="Insira o seu email"
                margin="normal"
                fullWidth
                required
              />
            </div>

            <div className="mt-6">
              <TextField
                id="password"
                name="password"
                label="Senha"
                type="password"
                value={ password }
                variant="outlined"
                onChange={ handlePassword }
                placeholder="**********"
                margin="normal"
                fullWidth
                required
              />
            </div>

            <div className="mt-6">
              <ThemeProvider theme={ theme }>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  color="primary"
                  disabled={ !validUser() }
                  onClick={ () => handleSubmit() }
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-corBotao hover:bg-corBotaoHover hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </Button>
              </ThemeProvider>
            </div>

            <div className="mt-6 flex justify-center items-center">
              <p className="text-gray-700">Não é cadastrado?</p>
              <a href="#" className="ml-1 text-blue-600" onClick={ () => setRegistration(true) }>Faça o Registro</a>
            </div>

            { invisibleElement && (
              <div className="mt-6">
                <p data-testid="common_login__element-invalid-email" className="text-md text-red-600 text-center">
                  E-mail ou Senha Inválidos
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
