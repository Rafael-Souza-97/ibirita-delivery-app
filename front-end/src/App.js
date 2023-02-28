import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Provider from './context/provider';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Provider>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={ Login } />
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
