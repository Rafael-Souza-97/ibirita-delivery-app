import React, { useState, useEffect, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdminNavBar from '../components/AdminNavBar';
import AdminUsers from '../components/AdminUsers';
import Context from '../context/context';
import { createNewUserAdmin } from '../services/requests';
import {
  NUMBER_ZERO,
  NUMBER_SIX,
  NUMBER_TWELVE,
} from '../utils/NumberConsts';

function Admin() {
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seller',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [formComplete, setFormComplete] = useState(false);
  const { setNewUserRegisterByAdmin } = useContext(Context);

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

    const adminData = JSON.parse(localStorage.getItem('user'));
    const { token } = adminData;

    const newUser = await createNewUserAdmin(newUserData, token);

    if (newUser === 'User already registered') {
      setErrorMessage('Usuário já registrado.');
      return;
    }
    setNewUserRegisterByAdmin(true);
    setErrorMessage('');
    setNewUserRegisterByAdmin(false);
  }

  return (
    <div>
      <div className="w-full">
        <AdminNavBar />
      </div>

      <form onSubmit={ handleSubmit } className="admin-form-container">
        <div className="flex flex-wrap lg:flex-row justify-between mb-2">
          <h1 className="text-center text-2xl font-bold mb-6">Cadastrar novo usuário</h1>
          { errorMessage.length > NUMBER_ZERO && (
            <p
              className="text-red-500 text-md mt-2 text-center"
              data-testid="admin_manage__element-invalid-register"
            >
              { errorMessage }
            </p>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full px-2">
            <TextField
              id="outlined-required"
              label="Nome"
              name="name"
              data-testid="admin_manage__input-name"
              placeholder="Seu nome"
              value={ newUserData.name }
              onChange={ handleChange }
              margin="normal"
              required
              className="w-full lg:w-64"
            />
          </div>
          <div className="w-full px-2">
            <TextField
              id="outlined-required"
              label="Email"
              name="email"
              data-testid="admin_manage__input-email"
              placeholder="seu-email@site.com.br"
              value={ newUserData.email }
              onChange={ handleChange }
              margin="normal"
              required
              className=" w-full lg:w-72"
            />
          </div>
          <div className="w-full px-2">
            <TextField
              id="password"
              label="Senha"
              type="password"
              variant="outlined"
              name="password"
              data-testid="admin_manage__input-password"
              placeholder="**********"
              value={ newUserData.password }
              onChange={ handleChange }
              margin="normal"
              required
              className=" w-full lg:w-60"
            />
          </div>
          <div className="w-full px-2">
            <FormControl sx={ { m: 1, minWidth: 120 } }>
              <InputLabel id="demo-simple-select-helper-label">Tipo</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Tipo"
                name="role"
                value={ newUserData.role }
                onChange={ handleChange }
                className="w-full lg:w-60"
              >
                <MenuItem value="seller">Vendedor</MenuItem>
                <MenuItem value="administrator">Administrador</MenuItem>
                <MenuItem value="customer">Cliente</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="w-full px-2 mt-12 md:mt-0 items-center justify-center">
            <button
              type="submit"
              data-testid="admin_manage__button-register"
              disabled={ !formComplete }
              onClick={ handleSubmit }
              className="w-full lg:w-auto h-[50px] inline-flex mt-18 justify-center py-4 px-6 border border-transparent shadow-sm text-lg rounded-md text-white bg-gradient-to-b from-corBotao to-corBotaoHover hover:from-corBotaoHover hover:to-corBotao focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center font-glacial-bold cursor-pointer"
            >
              CADASTRAR
            </button>
          </div>
        </div>
      </form>

      <div className="admin-form-container">
        <AdminUsers />
      </div>
    </div>
  );
}

export default Admin;
