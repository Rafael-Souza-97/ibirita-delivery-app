import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { requestRegister } from '../services/requests';
import {
  NUMBER_ZERO,
  NUMBER_SIX,
  NUMBER_TWELVE,
} from '../utils/NumberConsts';

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
        'O Email deve estar no formato <email>@<domínioPrincipal>.<domínioGenérico>.',
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

    const endpoint = 'http://localhost:3001/register';
    const registerToken = await requestRegister(endpoint, newUserData);

    if (registerToken === 'User already registered') {
      setErrorMessage('Usuário já registrado. Por favor, faça login');
      return;
    }

    console.log(registerToken);

    console.log('Cadastro realizado com sucesso!');

    localStorage.setItem('user', JSON.stringify(registerToken));

    history.push('/customer/products');

    setErrorMessage('');
  }

  return (
    <form onSubmit={ handleSubmit } className="form-container">
      <h1>Cadastro</h1>

      <div className="user-data-container">
        <label htmlFor="name">
          Nome
          <input
            type="text"
            id="name"
            name="name"
            data-testid="common_register__input-name"
            placeholder="Seu nome"
            value={ newUserData.name }
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            data-testid="common_register__input-email"
            placeholder="seu-email@site.com.br"
            value={ newUserData.email }
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            name="password"
            data-testid="common_register__input-password"
            placeholder="Sua senha"
            value={ newUserData.password }
            onChange={ handleChange }
          />
        </label>

        <button
          type="submit"
          data-testid="common_register__button-register"
          disabled={ !formComplete }
        >
          CADASTRAR
        </button>
      </div>

      { errorMessage.length > NUMBER_ZERO && (
        <p data-testid="common_register__element-invalid_register">
          { errorMessage }
        </p>
      )}
    </form>
  );
}

export default UserRegistration;
