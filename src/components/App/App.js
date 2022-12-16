import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';

import * as api from '../../utils/MainApi';
import Header from '../Header/Header';
import Main from '../Main/Main';
import User from '../User/User';
import Register from '../Register/Register';
import Login from '../Login/Login';

function App() {
  const history = useHistory();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const path = location.pathname;

  //Проверка токена и авторизация пользователя
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api
        .getContent(jwt)

        .then((res) => {
          if (res) {
            history.push('/');
            setIsLoggedIn(true);
          }

          // history.push(path);
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((profileInfo) => {
          setCurrentUser(profileInfo);
        })
        .catch((err) => {
          console.log(err);
        });

      api
        .getUsers()
        .then((cardsData) => {
          setUsers(cardsData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn, history]);

  //регистрация пользователя
  function handleRegister({ name, email, password }) {
    api
      .register(name, email, password)
      .then((res) => {
        console.log(res);
        localStorage.setItem('jwt', res.token);
        // handleAuthorize({ email, password });
      })
      .catch((err) => {
        // setIsSuccess(false);
        console.log(err);
      });
  }

  // авторизация пользователя
  function handleAuthorize({ email, password }) {
    // setIsLoading(true);
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          history.push('./');
        }
      })
      .catch((err) => {
        // setIsSuccess(false);
        console.log(err);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  }

  function onCardClick(card) {
    setUser(card);
  }

  function logout() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/signin');
  }

  return (
    <div className="page">
      <div className="page__content">
        <Switch>
          <Route path="/signin">
            {!isLoggedIn ? <Login onAuthorize={handleAuthorize} /> : <Redirect to="/" />}
          </Route>
          <Route path="/signup">
            {!isLoggedIn ? <Register onRegister={handleRegister} /> : <Redirect to="/" />}
          </Route>
          <ProtectedRoute
            path="/"
            exact
            loggedIn={isLoggedIn}
            component={Main}
            logout={logout}
            users={users}
            onCardClick={onCardClick}></ProtectedRoute>
          <ProtectedRoute
            path="/user"
            loggedIn={isLoggedIn}
            component={User}
            logout={logout}
            users={users}
            user={user}></ProtectedRoute>

          {/* <Route path="/*">
              <NotFound />
            </Route> */}
        </Switch>
      </div>
    </div>
  );
}

export default App;
