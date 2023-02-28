import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    let newErrorMessage = '';
    let newFormComplete = true;

    if (newUserData.name.length < NUMBER_TWELVE) {
      newErrorMessage = 'Nome completo deve conter pelo menos 12 caracteres.';
      newFormComplete = false;
    } else if (!newUserData.email.match(/^\S+@\S+\.\S+$/)) {
      newErrorMessage = `
        Email deve estar no formato <email>@<domínioPrincipal>.<domínioGenérico>.
      `;
      newFormComplete = false;
    } else if (newUserData.password.length < NUMBER_SIX) {
      newErrorMessage = 'Senha deve conter pelo menos 6 caracteres.';
      newFormComplete = false;
    }

    setErrorMessage(newErrorMessage);
    setFormComplete(newFormComplete);
  }, [newUserData, errorMessage]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(newUserData);
  };

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
        <p data-testid="common_register__element-invalid-register">
          { errorMessage }
        </p>
      )}
    </form>
  );
}

export default UserRegistration;
