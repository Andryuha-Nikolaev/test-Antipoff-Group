import React from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import User from '../User/User';

function App() {
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
          {/* <Route path="/signin">
            </Route> */}
          {/* <Route path="/signup">
            </Route> */}
          {/* <Route path="/*">
              <NotFound />
            </Route> */}
        </Switch>
      </div>
    </div>
  );
}

export default App;
