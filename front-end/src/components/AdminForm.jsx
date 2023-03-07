import React, { useState, useEffect } from 'react';
import { requestUsersAdmin } from '../services/requests';
import {
  NUMBER_ZERO,
  NUMBER_SIX,
  NUMBER_TWELVE,
} from '../utils/NumberConsts';

function AdminForm() {
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seller',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [formComplete, setFormComplete] = useState(false);

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

    console.log('USUARIO --> ', newUserData);
    const newUser = await requestUsersAdmin(newUserData, token);
    console.log('RESPOSTA DA API -->', newUserData);

    if (newUser === 'User already registered') {
      setErrorMessage('Usuário já registrado. Por favor, faça login');
      return;
    }

    setErrorMessage('');
  }

  return (
    <form onSubmit={ handleSubmit } className="admin-form-container">
      <div className="admin-title-container">
        <h1 className="admin-title">Cadastrar novo usuário</h1>
        { errorMessage.length > NUMBER_ZERO && (
          <p
            className="admin-error-message"
            data-testid="admin_manage__element-invalid-register"
          >
            { errorMessage }
          </p>
        )}
      </div>

      <div className="admin-user-data-container">
        <label htmlFor="name">
          Nome
          <input
            type="text"
            id="name"
            name="name"
            data-testid="admin_manage__input-name"
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
            data-testid="admin_manage__input-email"
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
            data-testid="admin_manage__input-password"
            placeholder="Sua senha"
            value={ newUserData.password }
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="role">
          Tipo
          <select
            type="select"
            data-testid="admin_manage__select-role"
            id="role"
            name="role"
            value={ newUserData.role }
            onChange={ handleChange }
          >
            <option defaultValue="seller">Vendedor</option>
            <option value="administrator">Administrador</option>
            <option value="customer">Cliente</option>
          </select>
        </label>

        <button
          type="submit"
          data-testid="admin_manage__button-register"
          disabled={ !formComplete }
          onClick={ handleSubmit }
        >
          CADASTRAR
        </button>
      </div>
    </form>
  );
}

export default AdminForm;
