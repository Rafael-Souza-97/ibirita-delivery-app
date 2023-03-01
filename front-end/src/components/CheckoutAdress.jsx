import React, { useContext } from 'react';
import Context from '../context/context';

function CheckoutAddress() {
  const { adressValues, setAdressValues } = useContext(Context);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAdressValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h2>Detalhes e Endereço para Entrega</h2>

      <form onSubmit={ handleSubmit }>
        <label htmlFor="seller">
          P. Vendedora Responsável:
          <select
            name="seller"
            id="seller"
            data-testid="customer_checkout_select-seller"
            onChange={ handleChange }
          >
            <option value="">-- Selecione --</option>
            <option value="fulana">Fulana</option>
            <option value="cicrana">Cicrana</option>
            <option value="xablau">Xablau</option>
          </select>
        </label>

        <label htmlFor="address">
          Endereço
          <input
            type="text"
            id="address"
            name="address"
            data-testid="customer_checkout_input-address"
            placeholder="Travessia Terceira da castanheira, Bairro Muruci"
            value={ adressValues.address }
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="number">
          Número
          <input
            type="number"
            id="number"
            name="number"
            data-testid="customer_checkout_input-number"
            placeholder="Travessia Terceira da castanheira, Bairro Muruci"
            value={ adressValues.number }
            onChange={ handleChange }
          />
        </label>

        <button
          type="submit"
          data-testid="customer_checkout_button-submit-order"
          disabled={
            !adressValues.seller || !adressValues.address || !adressValues.number
          }
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </div>
  );
}

export default CheckoutAddress;
