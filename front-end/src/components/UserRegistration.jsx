import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import theme from '../themes/themes';
import { requestRegister } from '../services/requests';
import { NUMBER_SIX, NUMBER_TWELVE } from '../utils/NumberConsts';
import ibirita from '../images/ibirita.png';

function UserRegistration() {
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [formComplete, setFormComplete] = useState(false);

  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }, []);

  useEffect(() => {
    let newFormComplete = true;

    if (newUserData.name.length < NUMBER_TWELVE) {
      setErrorMessage('O nome completo deve conter pelo menos 12 caracteres.');
      newFormComplete = false;
    } else if (!newUserData.email.match(/^\S+@\S+\.\S+$/)) {
      setErrorMessage(
        'O Email deve estar em um formato válido.',
      );
      newFormComplete = false;
    } else if (newUserData.password.length < NUMBER_SIX) {
      setErrorMessage('A senha deve conter pelo menos 6 caracteres.');
      newFormComplete = false;
    } else {
      setErrorMessage('');
    }

    setFormComplete(newFormComplete);
  }, [newUserData]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const registerToken = await requestRegister(newUserData);

    if (registerToken === 'User already registered') {
      setErrorMessage('Usuário já registrado. Por favor, faça login');
      return;
    }

    localStorage.setItem('user', JSON.stringify(registerToken));

    history.push('/customer/products');

    setErrorMessage('');
  }

  return (
    <div className="min-h-screen bg-corFundo flex flex-col justify-center py-20 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto px-2 logo-ibirita">
        <img src={ ibirita } alt="ibirita-logo" className="max-w-full mx-auto" />
        <form onSubmit={ handleSubmit } className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-center text-2xl font-bold mb-6">Faça o seu cadastro</h1>

          <div className="grid grid-cols-1 gap-6">
            {errorMessage.length > 0 && (
              <p data-testid="common_register__element-invalid_register" className="text-red-500 text-md mt-2 text-center">
                {errorMessage}
              </p>
            )}
            <div>
              <TextField
                id="outlined-basic"
                name="name"
                label="Nome"
                variant="outlined"
                value={ newUserData.name }
                onChange={ handleChange }
                placeholder="Insira o seu nome"
                margin="normal"
                fullWidth
                required
              />
            </div>

            <div>
              <TextField
                id="outlined-basic"
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                value={ newUserData.email }
                onChange={ handleChange }
                placeholder="Insira o seu email"
                data-testid="common_register__input-email"
                margin="normal"
                fullWidth
                required
              />
            </div>

            <div>
              <TextField
                id="password"
                name="password"
                label="Senha"
                type="password"
                value={ newUserData.password }
                variant="outlined"
                onChange={ handleChange }
                data-testid="common_register__input-password"
                placeholder="**********"
                margin="normal"
                fullWidth
                required
              />
            </div>

            <div className="mt-2 mb-4">
              <ThemeProvider theme={ theme }>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  color="primary"
                  disabled={ !formComplete }
                  onClick={ () => handleSubmit() }
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-corBotao hover:bg-corBotaoHover hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cadastrar
                </Button>
              </ThemeProvider>
            </div>
          </div>

          <div className="mt-6 flex justify-center items-center">
            <p className="text-gray-700">Já possui cadastrado?</p>
            <a href="#" className="ml-1 text-blue-600" onClick={ () => history.push('/login') }>Faça o Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserRegistration;
