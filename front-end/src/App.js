import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Provider from './context/provider';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import SuccessPage from './pages/SuccessPage';
import './App.css';
import APIRequest from './components/APIRequire';
import Orders from './pages/Orders';
import DetailsOrders from './pages/DetailsOrders';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Provider>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/customer/products" component={ Products } />
          <Route exact path="/customer/checkout" component={ Checkout } />
          <Route exact path="/customer/success" component={ SuccessPage } />
          <Route exact path="/customer/orders" component={ Orders } />
          <Route exact path="/customer/orders/:id" component={ DetailsOrders } />
          <APIRequest />
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
