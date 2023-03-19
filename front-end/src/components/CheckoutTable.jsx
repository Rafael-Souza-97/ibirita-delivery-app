import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/context';

function CheckoutTable({ products, onRemove }) {
  const { setCheckoutTotal, cartProducts, setCartProducts } = useContext(Context);

  const getTotalPrice = () => {
    const totalPrice = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    );

    const formattedPrice = (parseFloat(totalPrice))
      .toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    setCheckoutTotal(formattedPrice);

    return formattedPrice;
  };

  const handleRemoveProduct = (productId) => {
    const newCartProducts = cartProducts.filter((product) => product.id !== productId);
    setCartProducts(newCartProducts);
    onRemove(productId);
  };

  return (
    <div className="flex flex-col items-center bg-white">
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-center uppercase font-semibold text-sm">Item</th>
              <th className="py-3 px-6 text-center uppercase font-semibold text-sm">Descrição</th>
              <th className="py-3 px-6 text-center uppercase font-semibold text-sm">Quantidade</th>
              <th className="py-3 px-6 text-center uppercase font-semibold text-sm">Valor Unitário</th>
              <th className="py-3 px-6 text-center uppercase font-semibold text-sm">Subtotal</th>
              <th className="py-3 px-6 text-center uppercase font-semibold text-sm">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={ index + 1 } className="border-b border-gray-200">
                <td className="py-4 px-6 text-center">{index + 1}</td>
                <td className="py-4 px-6 text-center">{product.name}</td>
                <td className="py-4 px-6 text-center">{product.quantity}</td>
                <td className="py-4 px-6 text-center">
                  {`R$ ${(parseFloat(product.price)).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}`}
                </td>
                <td className="py-4 px-6 text-center">
                  {`R$ ${(parseFloat(product.price * product.quantity)).toLocaleString(
                    'pt-BR',
                    { minimumFractionDigits: 2 },
                  )}`}
                </td>
                <td className="py-4 px-6 text-center">
                  <button
                    type="button"
                    onClick={ () => handleRemoveProduct(product.id) }
                    className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-8">
        <div className="p-4 flex items-center">
          <h2 className="text-lg md:text-2xl font-glacial-regular">Total:</h2>
          <h2
            className="text-lg md:text-2xl font-bold text-corLetra font-glacial-bold ml-2"
            data-testid="customer_checkout__element-order-total-price"
          >
            {`R$ ${getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          </h2>
        </div>
      </div>
    </div>
  );
}

CheckoutTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CheckoutTable;
