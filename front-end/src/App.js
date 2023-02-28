import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Provider from './context/provider';
import Products from './pages/ProductsPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Provider>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/products" component={ Products } />
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
