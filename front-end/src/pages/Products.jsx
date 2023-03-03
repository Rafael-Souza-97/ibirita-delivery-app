import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Context from '../context/context';

export default function Products() {
  const { productsArray, setProductsArray, totalValue, setTotalValue, isLoaded,
    setCartProducts, insertProp, setIsertProp } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    const updatedCartProducts = productsArray
      .filter((product) => product.quantity > 0)
      .sort((a, b) => a.id - b.id);
    setCartProducts(updatedCartProducts);
  }, [productsArray, setCartProducts]);

  if (insertProp) {
    productsArray.forEach((item) => {
      item.quantity = 0;
      item.totalValue = 0;
      setProductsArray(productsArray);
      setIsertProp(false);
    });
  }

  const handleQuantityChange = (e) => {
    const numberId = Number(e.target.id);
    const quantity = e.target.value;
    const copyProducts = [...productsArray];
    const element = copyProducts.find((item) => item.id === numberId);
    element.quantity = quantity;
    element.totalValue = (element.quantity * element.price).toFixed(2);
    setProductsArray(copyProducts);
  };

  const handlePlusItem = (id) => {
    const numberId = Number(id);
    const copyProducts = [...productsArray];
    const element = copyProducts.find((item) => item.id === numberId);
    element.quantity += 1;
    element.totalValue = (element.quantity * element.price).toFixed(2);
    setProductsArray(copyProducts);
  };

  const handleMinusItem = (id) => {
    const numberId = Number(id);
    const copyProducts = [...productsArray];
    const element = copyProducts.find((item) => item.id === numberId);
    if (element.quantity > 0) {
      element.quantity -= 1;
      element.totalValue = (element.quantity * element.price).toFixed(2);
      setProductsArray(copyProducts);
    }
  };

  const totalPrice = productsArray.map((item) => Number(item.totalValue));

  const disableButtton = () => {
    const iqualZero = totalPrice.map((item) => item !== 0);
    return iqualZero.includes(true);
  };

  setTotalValue(totalPrice.reduce((acc, current) => acc + current, 0).toFixed(2));

  return (
    <div>
      <NavBar />
      <div className="product-grid">
        {isLoaded ? productsArray.map((products) => (
          <div key={ products.id } className="product-card">
            <img
              src={ products.image }
              alt={ products.name }
              data-testid={ `customer_products__img-card-bg-${products.id}` }
            />
            <h2
              data-testid={ `customer_products__element-card-title-${products.id}` }
            >
              { products.name }
            </h2>
            <p
              data-testid={ `customer_products__element-card-price-${products.id}` }
            >
              {products.price}
            </p>
            <div className="btn_shopping-cart">
              <button
                type="button"
                onClick={ (e) => handlePlusItem(e.target.id) }
                id={ products.id }
                data-testid={ `customer_products__button-card-add-item-${products.id}` }
              >
                +
              </button>
              <br />
              <input
                type="number"
                data-testid={ `customer_products__input-card-quantity-${products.id}` }
                placeholder="0"
                id={ products.id }
                value={ products.quantity }
                min="0"
                onChange={ (e) => handleQuantityChange(e) }
              />
              <button
                type="button"
                onClick={ (e) => handleMinusItem(e.target.id) }
                id={ products.id }
                data-testid={ `customer_products__button-card-rm-item-${products.id}` }
              >
                -
              </button>
            </div>
          </div>
        ))
          : <h1>Loading</h1>}
      </div>
      <div>
        <button
          type="button"
          data-testid="customer_products__button-cart"
          disabled={ !disableButtton() }
          onClick={ () => history.push('/customer/checkout') }
        >
          Ver Carrinho: R$
          <p
            data-testid="customer_products__checkout-bottom-value"
          >
            { `${
              parseFloat(totalValue)
                .toLocaleString('pt-BR', { minimumFractionDigits: 2 })
            }`}
          </p>
        </button>
      </div>
    </div>
  );
}
