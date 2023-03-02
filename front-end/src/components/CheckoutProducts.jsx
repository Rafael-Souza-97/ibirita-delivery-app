import React, { useContext, useState } from 'react';
import Context from '../context/context';
import CheckoutAddress from './CheckoutAdress';
import CheckoutTable from './CheckoutTable';

function CheckoutProducts() {
  const { cartProducts } = useContext(Context);
  const [products, setProducts] = useState(cartProducts);

  const removeProduct = (productId) => {
    setProducts((prevProducts) => prevProducts
      .filter((product) => product.id !== productId));
  };

  const getTotalPrice = () => {
    const totalPrice = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );

    const formattedPrice = totalPrice
      .toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    console.log(formattedPrice);

    return formattedPrice;
  };

  return (
    <div>
      <h2>Finalizar Pedido</h2>

      <CheckoutTable products={ products } onRemove={ removeProduct } />

      <div>
        <h4>Total:</h4>
        <h3 data-testid="customer_checkout__element-order-total-price">
          {`${
            getTotalPrice()
          }`}
        </h3>

        <div>
          <CheckoutAddress />
        </div>
      </div>
    </div>
  );
}

export default CheckoutProducts;
