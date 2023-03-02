import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/context';

function CheckoutAddress() {
  const { adressValues, setAdressValues } = useContext(Context);
  const { cartProducts } = useContext(Context);

  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAdressValues((prevState) => ({
      ...prevState, [name]: value,
    }));
  };

  async function sellRegister() {
    try {
      const user = localStorage.getItem('user');
      const { id } = JSON.parse(user);
      const products = cartProducts.map((product) => (
        { productId: product.id, quantity: product.quantity }));

      const register = {
        userId: id,
        sellerId: 2,
        products,
        deliveryAddress: adressValues.address,
        deliveryNumber: adressValues.number,
      };
      console.log(register);
      const sellerId = 1;

      history.push(`/customer/orders/${sellerId}`);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(adressValues);
  return (
    <div>
      <h2>Detalhes e Endereço para Entrega</h2>

      <form>
        <label htmlFor="seller">
          P. Vendedora Responsável:
          <select
            id="seller"
            name="seller"
            data-testid="customer_checkout__select-seller"
            value={ adressValues.seller }
            onChange={ handleChange }
          >
            <option value="Fulana Pereira">Fulana Pereira</option>
          </select>
        </label>

        <label htmlFor="address">
          Endereço
          <input
            type="text"
            id="address"
            name="address"
            data-testid="customer_checkout__input-address"
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
            data-testid="customer_checkout__input-address-number"
            placeholder="Travessia Terceira da castanheira, Bairro Muruci"
            value={ adressValues.number }
            onChange={ handleChange }
          />
        </label>

        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
          // disabled={
          //   !adressValues.address || !adressValues.number
          // }
          onClick={ () => sellRegister() }
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </div>
  );
}

export default CheckoutAddress;
