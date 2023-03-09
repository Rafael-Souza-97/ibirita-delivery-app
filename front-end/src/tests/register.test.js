import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserRegistration from '../pages/Register';
import { requestRegister } from '../services/requests';

jest.mock('../services/requests', () => ({
  requestRegister: jest.fn(),
}));

describe('UserRegistration', () => {
  const name = 'João da Silva';
  const email = 'joaodasilva@email.com';
  const password = '123456';
  const inputName = 'common_register__input-name';
  const inputEmail = 'common_register__input-email';
  const inputPassword = 'common_register__input-password';
  const inputSubmit = 'common_register__button-register';
  const emailFormat = 'O Email deve estar no formato <email>';
  const mockUser = {
    name,
    email,
    password,
  };

  beforeEach(() => {
    localStorage.clear();
    requestRegister.mockClear();
  });

  it('renders the registration form', () => {
    render(<UserRegistration />, { wrapper: MemoryRouter });

    expect(screen.getByText('Cadastro')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'CADASTRAR' })).toBeInTheDocument();
  });

  it('validates user input and enables/disables the submit button', async () => {
    render(<UserRegistration />, { wrapper: MemoryRouter });

    const nameInput = screen.getByTestId(inputName);
    const emailInput = screen.getByTestId(inputEmail);
    const passwordInput = screen.getByTestId(inputPassword);
    const submitButton = screen.getByTestId(inputSubmit);

    // Test empty fields
    expect(submitButton).toBeDisabled();

    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    // Test complete form
    expect(submitButton).toBeEnabled();

    fireEvent.change(nameInput, { target: { value: 'João' } });

    // Test invalid name
    expect(submitButton).toBeDisabled();
    expect(screen.getByText('O nome completo deve conter pelo menos 12 caracteres.'))
      .toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(emailInput, { target: { value: 'emailInvalido' } });

    // Test invalid email
    expect(submitButton).toBeDisabled();
    expect(screen.getByText(`${emailFormat}@<domínioPrincipal>.<domínioGenérico>.`))
      .toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: 'pass' } });

    // Test invalid password
    expect(submitButton).toBeDisabled();
    expect(screen.getByText('A senha deve conter pelo menos 6 caracteres.'))
      .toBeInTheDocument();
  });

  it('submits the registration form and redirects to the products page', async () => {
    requestRegister.mockResolvedValueOnce(mockUser);

    render(<UserRegistration />, { wrapper: MemoryRouter });

    const nameInput = screen.getByTestId(inputName);
    const emailInput = screen.getByTestId(inputEmail);
    const passwordInput = screen.getByTestId(inputPassword);
    const submitButton = screen.getByTestId(inputSubmit);

    fireEvent.change(nameInput, { target: { value: mockUser.name } });
    fireEvent.change(emailInput, { target: { value: mockUser.email } });
    fireEvent.change(passwordInput, { target: { value: mockUser.password } });
    fireEvent.click(submitButton);

    expect(requestRegister).toHaveBeenCalledTimes(1);
  });

  it('should handle registration when user is already registered', async () => {
    requestRegister.mockResolvedValueOnce('User already registered');

    const { getByTestId, queryByTestId } = render(<UserRegistration />);
    const nameInput = getByTestId(inputName);
    const emailInput = getByTestId(inputEmail);
    const passwordInput = getByTestId(inputPassword);
    const submitButton = getByTestId(inputSubmit);

    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(requestRegister).toHaveBeenCalledWith({
        name,
        email,
        password,
      });

      expect(queryByTestId('common_register__element-invalid_register'))
        .toHaveTextContent(
          'Usuário já registrado. Por favor, faça login',
        );

      expect(localStorage.getItem('user')).toBeNull();
    });
  });
});
