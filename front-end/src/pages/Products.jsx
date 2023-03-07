import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Context from '../context/context';
import { requestData } from '../services/requests';
import '../styles/Products.css';

export default function Products() {
  const { productsArray, setProductsArray } = useContext(Context);
  const { totalValue, setTotalValue } = useContext(Context);
  const { setCartProducts } = useContext(Context);

  const history = useHistory();

  const totalPrice = productsArray.map((item) => Number(item.totalValue));
  setTotalValue(totalPrice.reduce((acc, current) => acc + current, 0).toFixed(2));

  const handleQuantityChange = (e) => {
    const numberId = +e.target.id;
    const quantity = +e.target.value;
    const copyProducts = [...productsArray];
    const element = copyProducts.find((item) => +item.id === +numberId);
    element.quantity = quantity;
    element.totalValue = (element.quantity * +element.price).toFixed(2);
    setProductsArray(copyProducts);
  };

  useEffect(() => {
    const endpoint = '/products';
    const { token } = JSON.parse(localStorage.getItem('user'));
    const fetchProducts = async () => {
      const products = await requestData(endpoint, token);
      products.forEach((item) => {
        item.quantity = 0;
        item.totalValue = 0;
      });
      setProductsArray(products);
    };
    fetchProducts();
  }, [setProductsArray]);

  const handlePlusItem = (id) => {
    const numberId = +id;
    const copyProducts = [...productsArray];
    const element = copyProducts.find((item) => +item.id === +numberId);
    element.quantity += 1;
    element.totalValue = (element.quantity * +element.price).toFixed(2);
    setProductsArray(copyProducts);
  };

  const handleMinusItem = (id) => {
    const numberId = +id;
    const copyProducts = [...productsArray];
    const element = copyProducts.find((item) => +item.id === +numberId);
    if (element.quantity > 0) {
      element.quantity -= 1;
      element.totalValue = (element.quantity * +element.price).toFixed(2);
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

  useEffect(() => {
    const updatedCartProducts = productsArray
      .filter((product) => product.quantity > 0)
      .sort((a, b) => a.id - b.id);
    setCartProducts(updatedCartProducts);
  }, [productsArray, setCartProducts]);

  return (
    <div>
      <NavBar />
      <div className="product-grid">
        { productsArray.map((products) => (
          <div key={ products.id } className="product-card">
            <img
              src={ products.urlImage }
              alt={ products.name }
              data-testid={ `customer_products__img-card-bg-image-${products.id}` }
            />

            <h2
              data-testid={ `customer_products__element-card-title-${products.id}` }
            >
              { products.name }
            </h2>

            <p
              data-testid={ `customer_products__element-card-price-${products.id}` }
            >
              { parseFloat(products.price)
                .toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }
            </p>

            <div className="btn_shopping-cart">
              <button
                type="button"
                id={ products.id }
                data-testid={ `customer_products__button-card-rm-item-${products.id}` }
                className="button-minus-item"
                onClick={ (e) => handleMinusItem(e.target.id) }
              >
                -
              </button>

              <input
                type="number"
                data-testid={ `customer_products__input-card-quantity-${products.id}` }
                placeholder="0"
                id={ products.id }
                value={ products.quantity }
                min="0"
                className="input-quantity-products"
                onChange={ (e) => handleQuantityChange(e) }
              />

              <button
                type="button"
                onClick={ (e) => handlePlusItem(e.target.id) }
                id={ products.id }
                className="button-plus-item"
                data-testid={ `customer_products__button-card-add-item-${products.id}` }
              >
                +
              </button>

            </div>
          </div>
        ))}
      </div>
      <div className="submit-products-button-container">
        <button
          type="button"
          data-testid="customer_products__button-cart"
          className="submit-products"
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
