import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './App.css';

import * as api from '../../utils/MainApi';
import Main from '../Main/Main';
import User from '../User/User';
import Register from '../Register/Register';
import Login from '../Login/Login';

function App() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

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
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setIsLoading(true);
    api
      .register(name, email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        handleAuthorize({ email, password });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // авторизация пользователя
  function handleAuthorize({ email, password }) {
    setIsLoading(true);
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
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onAccountClick(user) {
    setUser(currentUser);
  }

  function onCardClick(card) {
    setUser(card);
  }

  function onCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setUsers((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function logout() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Switch>
            <Route path="/signin">
              {!isLoggedIn ? (
                <Login onAuthorize={handleAuthorize} isLoading={isLoading} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/signup">
              {!isLoggedIn ? (
                <Register onRegister={handleRegister} isLoading={isLoading} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <ProtectedRoute
              path="/"
              exact
              loggedIn={isLoggedIn}
              component={Main}
              logout={logout}
              users={users}
              onAccountClick={onAccountClick}
              onCardLike={onCardLike}
              onCardClick={onCardClick}></ProtectedRoute>
            <ProtectedRoute
              path="/user"
              loggedIn={isLoggedIn}
              component={User}
              logout={logout}
              users={users}
              user={user}></ProtectedRoute>
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
