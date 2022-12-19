import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, setUsers } from '../../redux/slices/userSlice';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import './App.css';

import * as api from '../../utils/MainApi';
import Main from '../Main/Main';
import User from '../User/User';
import Register from '../Register/Register';
import Login from '../Login/Login';
import EditAvatarPopup from '../Popup/EditAvatarPopup';
import NotFound from '../NotFound/NotFound';

function App() {
  const history = useHistory();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userCard, setUserCard] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const path = location.pathname;

  const currentUser = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();

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
          // history.push('/');
          history.push(path);
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
          dispatch(setCurrentUser(profileInfo));
        })
        .catch((err) => {
          console.log(err);
        });

      api
        .getUsers()
        .then((cardsData) => {
          dispatch(setUsers(cardsData));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, history, location]);

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

  function onCardClick(card) {
    setUserCard(card);
  }

  function onCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newUsers = users.map((c) => (c._id === card._id ? newCard : c));
        dispatch(setUsers(newUsers));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api
      .setUserAvatar(newAvatar)
      .then((data) => {
        dispatch(setCurrentUser(data));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
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
            onCardLike={onCardLike}
            onCardClick={onCardClick}></ProtectedRoute>
          <ProtectedRoute
            path="/user/:id"
            loggedIn={isLoggedIn}
            onEditAvatar={setIsEditAvatarPopupOpen}
            component={User}
            logout={logout}
            user={userCard}></ProtectedRoute>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;
