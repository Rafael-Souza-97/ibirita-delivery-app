import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Context from '../context/context';

export default function Products() {
  const { productsArray, setProductsArray } = useContext(Context);
  const { totalValue, setTotalValue } = useContext(Context);
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

  const MOCK = [{
    id: 1,
    name: 'Skol Lata 250ml',
    price: 2.20,
    url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: 7.50,
    url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
  {
    id: 3,
    name: 'Antarctica Pilsen 300ml',
    price: 2.49,
    url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
  },
  {
    id: 4,
    name: 'Brahma 600ml',
    price: 7.50,
    url_image: 'http://localhost:3001/images/brahma_600ml.jpg',
  },
  {
    id: 5,
    name: 'Skol 269ml',
    price: 2.19,
    url_image: 'http://localhost:3001/images/skol_269ml.jpg',
  },
  {
    id: 6,
    name: 'Skol Beats Senses 313ml',
    price: 4.49,
    url_image: 'http://localhost:3001/images/skol_beats_senses_313ml.jpg',
  },
  {
    id: 7,
    name: 'Becks 330ml',
    price: 4.99,
    url_image: 'http://localhost:3001/images/becks_330ml.jpg',
  },
  {
    id: 8,
    name: 'Brahma Duplo Malte 350ml',
    price: 2.79,
    url_image: 'http://localhost:3001/images/brahma_duplo_malte_350ml.jpg',
  },
  {
    id: 9,
    name: 'Becks 600ml',
    price: 8.89,
    url_image: 'http://localhost:3001/images/becks_600ml.jpg',
  },
  {
    id: 10,
    name: 'Skol Beats Senses 269ml',
    price: 3.57,
    url_image: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
  },
  {
    id: 11,
    name: 'Stella Artois 275ml',
    price: 3.49,
    url_image: 'http://localhost:3001/images/stella_artois_275ml.jpg',
  }];

  useEffect(() => {
    MOCK.forEach((item) => {
      item.quantity = 0;
      item.totalValue = 0;
    });
    setProductsArray(MOCK);
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
        {productsArray.map((products) => (
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
              {products.price.toFixed(2)}
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
        ))}
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
