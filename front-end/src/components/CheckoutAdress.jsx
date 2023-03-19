import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { requestCheckout } from '../services/requests';
import Context from '../context/context';
// import '../styles/CheckoutAddress.css';

function CheckoutAddress() {
  const {
    adressValues, setAdressValues, cartProducts, checkoutTotal, setOrderResponse,
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
      console.log(request);

      setOrderResponse(request);

      const lastOrder = request[request.length - 1];

      const { id } = lastOrder;
      history.push(`/customer/orders/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col items-center py-6 pt-12 w-full bg-white">
      <h2 className="text-2xl mb-4 font-medium">Detalhes e Endereço para Entrega</h2>

      <form className="flex flex-wrap w-full xl:w-4/6 items-center justify-center">
        <div className="flex flex-col md:flex-row flex-evenly justify-evenly items-center w-full mb-4 md:pr-4">
          <div className="mt-2">
            <FormControl sx={ { m: 1, minWidth: 120 } }>
              <InputLabel id="demo-simple-select-helper-label">Vendedor (a)</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Vendedor (a)"
                name="seller"
                value={ adressValues.seller }
                onChange={ handleChange }
                className="w-60"
              >
                <MenuItem value="Fulana Pereira">Katia Francisca</MenuItem>
                <MenuItem value="Waldir Silva">Waldir Silva</MenuItem>
                <MenuItem value="Beatriz Santos">Beatriz Santos</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div>
            <TextField
              id="outlined-required"
              label="Endereço"
              value={ adressValues.address }
              onChange={ handleChange }
              name="address"
              data-testid="customer_checkout__input-address"
              placeholder="Insira o seu endereço completo"
              className="md:w-96"
              margin="normal"
              required
            />
          </div>

          <div>
            <TextField
              id="outlined-number"
              label="Número"
              type="number"
              InputLabelProps={ {
                shrink: true,
              } }
              variant="outlined"
              name="number"
              data-testid="customer_checkout__input-address-number"
              value={ adressValues.number }
              onChange={ handleChange }
              placeholder="Número da casa/apto"
              margin="normal"
              className="md:w-60"
              required
            />
          </div>
        </div>

        <div className="flex items-center w-full justify-center mt-14">
          <button
            type="button"
            data-testid="customer_checkout__button-submit-order"
            onClick={ () => sellRegister() }
            disabled={ !adressValues.address || !adressValues.number }
            className="w-[220px] h-[50px] mb-10 inline-flex justify-center py-4 px-6 border border-transparent shadow-sm text-lg rounded-md text-white bg-gradient-to-b from-corBotao to-corBotaoHover hover:from-corBotaoHover hover:to-corBotao focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-center font-glacial-bold cursor-pointer"
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutAddress;
