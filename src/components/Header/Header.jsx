import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
// import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useSelector } from 'react-redux';

import './Header.css';

import logoutImg from '../../assets/img/header-logout.svg';
import backImg from '../../assets/img/header-back.svg';
import accountImg from '../../assets/img/header-account.svg';

function Header({ card, logout, onAccountClick, onEditAvatar }) {
  // const currentUser = React.useContext(CurrentUserContext);
  const { pathname } = useLocation();

  const currentUser = useSelector((state) => state.user.currentUser);

  console.log(currentUser);

  function handleLogout() {
    logout();
  }

  function handleAccount() {
    onAccountClick(card);
  }

  return (
    <header className="header">
      <div className="header__button-container">
        {pathname === '/' ? (
          <Link to="/user" className="header__button header__button_back" onClick={handleAccount}>
            <p className="header__button-text">Аккаунт</p>
            <img className="header__button-img" src={accountImg} alt="кнопка выйти" />
          </Link>
        ) : (
          <Link to="/" className="header__button header__button_back">
            <p className="header__button-text">Назад</p>
            <img className="header__button-img" src={backImg} alt="кнопка назад" />
          </Link>
        )}

        <button
          className="header__button header__button_logout"
          type="button"
          onClick={handleLogout}>
          <p className="header__button-text">Выход</p>
          <img className="header__button-img" src={logoutImg} alt="кнопка выйти" />
        </button>
      </div>
      {pathname === '/' ? (
        <div className="header__content">
          <h1 className="header__title">Наша команда</h1>
          <p className="header__description">
            Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их
            плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.
          </p>
        </div>
      ) : (
        <div className="header__user-content">
          <div className="header__avatar-container">
            {currentUser._id === card._id ? (
              <>
                <img
                  className="header__user-img"
                  src={currentUser.avatar}
                  alt="аватар пользователя"
                />
                <button
                  type="button"
                  className="header__avatar-button"
                  id="avatar-button"
                  aria-label="изменить аватар"
                  onClick={() => {
                    onEditAvatar(true);
                  }}></button>
              </>
            ) : (
              <img className="header__user-img" src={card.avatar} alt="аватар пользователя" />
            )}
          </div>
          {/* <img className="header__user-img" src={card.avatar} alt="фото пользователя" /> */}
          <div className="header__user-info">
            <h2 className="header__user-name">{card.name}</h2>
            <p className="header__user-job">Партнер</p>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
