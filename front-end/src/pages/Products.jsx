import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Context from '../context/context';
import { requestData } from '../services/requests';

export default function Products() {
  const [loading, setLoading] = useState(false);
  const { productsArray, setProductsArray, productsAPI,
    setProductsAPI, totalValue, setTotalValue } = useContext(Context);
  const history = useHistory();
  const totalPrice = productsArray.map((item) => Number(item.totalValue));
  setTotalValue(totalPrice.reduce((acc, current) => acc + current, 0).toFixed(2));

  const handleQuantityChange = (e) => {
    const numberId = Number(e.target.id);
    const quantity = e.target.value;
    const copyProducts = [...productsArray];
    const element = copyProducts.find((item) => item.id === numberId);
    element.quantity = quantity;
    element.totalValue = (element.quantity * element.price).toFixed(2);
    setProductsArray(copyProducts);
  };

  const fetchAPI = async () => {
    const endpoint = 'http://localhost:3003/products';
    const data = await requestData(endpoint);
    setProductsAPI(data);
    setLoading(true);
  };

  if (productsAPI.length > 0) {
    productsAPI.forEach((item) => {
      item.quantity = 0;
      item.totalValue = 0;
      setProductsArray(productsAPI);
    });
  }

  useEffect(() => {
    fetchAPI();
  }, []);

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
    } else {
      const filteredProducts = productsArray.filter((products) => products.id !== id);
      setProductsArray(filteredProducts);
    }
  };

  const disableButtton = () => {
    const iqualZero = totalPrice.map((item) => item !== 0);
    return iqualZero.includes(true);
  };

  return (
    <div>
      <NavBar />
      <div className="product-grid">
        { loading === true
          ? productsArray.map((products) => (
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
          Ver Carrinho:
          <h5
            data-testid="customer_products__checkout-bottom-value"
          >
            R$
            {totalValue}
          </h5>
        </button>
      </div>
    </div>
  );
}
