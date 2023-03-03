import React, { useContext, useState } from 'react';
import CheckoutAddress from '../components/CheckoutAdress';
import CheckoutTable from '../components/CheckoutTable';
import NavBar from '../components/NavBar';
import Context from '../context/context';

function Checkout() {
  const { cartProducts } = useContext(Context);
  const [products, setProducts] = useState(cartProducts);

  const removeProduct = (productId) => {
    setProducts((prevProducts) => prevProducts
      .filter((product) => product.id !== productId));
  };

  return (
    <div>
      <NavBar />

      <div>
        <h2>Finalizar Pedido</h2>

        <CheckoutTable
          products={ products }
          onRemove={ removeProduct }
        />
      </div>

      <div>
        <CheckoutAddress />
      </div>
    </div>
  );
}

export default Checkout;
