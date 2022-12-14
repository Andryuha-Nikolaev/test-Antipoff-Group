import React, { useState } from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import User from '../User/User';
import Register from '../Register/Register';
import Login from '../Login/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="page">
      <div className="page__content">
        <Switch>
          <Route path="/" exact>
            <Header />
            <Main />
          </Route>
          <Route path="/user/:id">
            <Header />
            <User />
          </Route>
          <Route path="/signin">{!isLoggedIn ? <Login /> : <Redirect to="/" />}</Route>
          <Route path="/signup">{!isLoggedIn ? <Register /> : <Redirect to="/" />}</Route>
          {/* <Route path="/*">
              <NotFound />
            </Route> */}
        </Switch>
      </div>
    </div>
  );
}

export default App;
