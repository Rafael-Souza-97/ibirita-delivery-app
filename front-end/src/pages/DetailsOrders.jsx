import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Context from '../context/context';
import mock from '../MOCKS/OREDERSUSER';
import users from '../MOCKS/USERS';

export default function DetailsOrders() {
  const [orders, setOrder] = useState([{}]);
  const [loaded, setLoaded] = useState(false);
  const { productsArray } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    const minusOne = -1;
    const sellId = Number(history.location.pathname.slice(minusOne));
    const orderNumber = mock.find((item) => item.id
    === sellId);
    setLoaded(true);
    setOrder([orderNumber]);
  }, []);

  // return (
  //   <div>
  //     <NavBar />
  //     {loaded
  //       ? orders.map((order) => (
  //         (
  //           <div key={ order.id }>
  //             <h2
  //               data-testid={ `customer_orders__element-delivery-status-${order.id}` }
  //               id={ order.id }
  //             >
  //               { sellerName }
  //             </h2>
  //             <h2
  //               data-testid={ `customer_orders__element-delivery-status-${order.id}` }
  //               id={ order.id }
  //             >
  //               { order.status }
  //             </h2>
  //             <h2
  //               data-testid={ `customer_orders__element-order-date-${order.id}` }
  //               id={ order.id }
  //             >
  //               { order.saleDate }
  //             </h2>
  //             <h2
  //               data-testid={ `customer_orders__element-order-id-${order.id}` }
  //               id={ order.id }
  //             >
  //               { order.id }
  //             </h2>
  //             <p
  //               data-testid={ `customer_orders__element-card-price-${order.id}` }
  //               id={ order.id }
  //             >
  //               {order.totalPrice}
  //             </p>
  //             <table>
  //               <thead>
  //                 <tr>
  //                   <th>Item</th>
  //                   <th>Descrição</th>
  //                   <th>Quantidade</th>
  //                   <th>Valor Unitário</th>
  //                   <th>Sub-Total</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 { order.products.map((products, index) => (
  //                   <tr key={ index + 1 }>
  //                     <td
  //                       data-testid={
  //                         `customer_checkout__element-order-table-item-number-${index}`
  //                       }
  //                     >
  //                       { index + 1 }
  //                     </td>
  //                     <td>
  //                       { productsArray.map((item) => (item.id === products.productId
  //                         ? item.name : undefined))}
  //                     </td>
  //                     <td>
  //                       { products.quantity }
  //                     </td>
  //                     <td
  //                       data-testid={
  //                         `customer_checkout__element-order-table-unit-price-${index}`
  //                       }
  //                     >
  //                       { productsArray.map((item) => (item.id === products.productId
  //                         ? item.price : undefined))}
  //                     </td>
  //                     <td
  //                       data-testid={
  //                         `customer_checkout__element-order-table-sub-total-${index}`
  //                       }
  //                     >
  //                       { productsArray.map((item) => (item.id === products.productId
  //                         ? item.price * products.quantity
  //                         : undefined))}
  //                     </td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>
  //           </div>
  //         )
  //       )) : <div>Loading</div>}
  //   </div>
  // );
  return (
    <div>
      <NavBar />
      {loaded ? (
        orders.map((order) => {
          const seller = users.map((item) => (Number(item.id)
          === Number(order.sellerId)
            ? item.name : undefined));
          return (
            <div key={ order.id }>
              <h2
                data-testid={ `customer_orders__element-delivery-status-${order.id}` }
                id={ order.id }
              >
                {seller}
              </h2>
              <h2
                data-testid={ `customer_orders__element-delivery-status-${order.id}` }
                id={ order.id }
              >
                {order.status}
              </h2>
              <h2
                data-testid={ `customer_orders__element-order-date-${order.id}` }
                id={ order.id }
              >
                {order.saleDate}
              </h2>
              <h2
                data-testid={ `customer_orders__element-order-id-${order.id}` }
                id={ order.id }
              >
                {order.id}
              </h2>
              <p
                data-testid={ `customer_orders__element-card-price-${order.id}` }
                id={ order.id }
              >
                {order.totalPrice}
              </p>
              <button
                type="button"
                data-testid={ `customer_order_details__
                element-order-details-label-seller-name` }
              >
                Marcar como entregue
              </button>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Descrição</th>
                    <th>Quantidade</th>
                    <th>Valor Unitário</th>
                    <th>Sub-Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product, index) => {
                    const item = productsArray.find((element) => element.id
                    === product.productId);
                    const itemName = item ? item.name : undefined;
                    const itemPrice = item ? item.price : undefined;
                    const subTotal = item ? item.price * product.quantity : undefined;
                    return (
                      <tr key={ index + 1 }>
                        <td
                          data-testid={
                            `customer_checkout__element-order-table-item-number-${index}`
                          }
                        >
                          {index + 1}
                        </td>
                        <td>{itemName}</td>
                        <td>{product.quantity}</td>
                        <td
                          data-testid={
                            `customer_checkout__element-order-table-unit-price-${index}`
                          }
                        >
                          {itemPrice}
                        </td>
                        <td
                          data-testid={
                            `customer_checkout__element-order-table-sub-total-${index}`
                          }
                        >
                          {subTotal}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
