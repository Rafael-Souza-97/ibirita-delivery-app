import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Provider from './context/provider';
import Login from './pages/Login';
import UserRegister from './pages/UserRegister';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Provider>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ UserRegister } />
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
