import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/context';
import { requestCheckout } from '../services/requests';
import '../styles/CheckoutAddress.css';

function CheckoutAddress() {
  const {
    adressValues, setAdressValues, cartProducts, checkoutTotal, setCheckoutResponse,
  } = useContext(Context);

  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAdressValues((prevState) => ({
      ...prevState, [name]: value,
    }));
  };

  async function sellRegister() {
    try {
      if (cartProducts.length === 0) {
        alert('Não há produtos no carrinho.');
        return;
      }
      const user = localStorage.getItem('user');
      if (!user) {
        history.push('/login');
        return;
      }
      const { id: userId } = JSON.parse(user);

      const products = cartProducts.map((item) => (
        { productId: item.id, quantity: item.quantity }));

      const saleData = {
        userId,
        sellerId: 2,
        products,
        totalPrice: parseFloat(checkoutTotal.replace(',', '.')),
        deliveryAddress: adressValues.address,
        deliveryNumber: Number(adressValues.number),
      };
      console.log(saleData);
      const request = await requestCheckout(saleData);

      setCheckoutResponse(saleData);
      console.log(request);

      const { id } = request;

      history.push(`/customer/orders/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="checkout-form">
      <h2 className="checkout-title">Detalhes e Endereço para Entrega</h2>

      <form className="checkout-form-fields">
        <label htmlFor="seller" className="checkout-label">
          P. Vendedora Responsável:
          <select
            id="seller"
            name="seller"
            data-testid="customer_checkout__select-seller"
            value={ adressValues.seller }
            onChange={ handleChange }
            className="checkout-select"
          >
            <option value="Fulana Pereira">Fulana Pereira</option>
          </select>
        </label>

        <label htmlFor="address" className="checkout-label">
          Endereço
          <input
            type="text"
            id="address"
            name="address"
            data-testid="customer_checkout__input-address"
            placeholder="Travessia Terceira da castanheira, Bairro Muruci"
            value={ adressValues.address }
            onChange={ handleChange }
            className="checkout-input"
          />
        </label>

        <label htmlFor="number" className="checkout-label">
          Número
          <input
            type="number"
            id="number"
            name="number"
            data-testid="customer_checkout__input-address-number"
            placeholder="Número"
            value={ adressValues.number }
            onChange={ handleChange }
            className="checkout-input"
          />
        </label>

        <div className="checkout-button">
          <button
            type="button"
            data-testid="customer_checkout__button-submit-order"
            onClick={ () => sellRegister() }
            disabled={ !adressValues.address || !adressValues.number }
            className="checkout-button"
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutAddress;
