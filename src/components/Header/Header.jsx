import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import './Header.css';

import userImg from '../../assets/img/header-user-img.png';
import logoutImg from '../../assets/img/header-logout.svg';
import back from '../../assets/img/header-back.svg';

function Header({ card, logout }) {
  const { pathname } = useLocation();

  function handleLogout() {
    logout();
  }
  return (
    <header className="header">
      <div className="header__button-container">
        {pathname === '/' ? (
          ''
        ) : (
          <Link to="/" className="header__button header__button_back">
            <p className="header__button-text">Назад</p>
            <img className="header__button-img" src={back} alt="кнопка назад" />
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
          <img className="header__user-img" src={card.avatar} alt="фото пользователя" />
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
