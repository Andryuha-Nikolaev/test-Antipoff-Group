import React from 'react';
import { useLocation } from 'react-router-dom';

import './Header.css';

import userImg from '../../assets/img/header-user-img.png';

function Header() {
  const { pathname } = useLocation();
  return (
    <header className="header">
      <div className="header__button-container">
        {pathname === '/' ? (
          ''
        ) : (
          <button className="header__button header__button_back" type="button">
            Назад
          </button>
        )}
        <button className="header__button header__button_logout" type="button">
          Выход
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
          <img className="header__user-img" src={userImg} alt="фото пользователя" />
          <div className="header__user-info">
            <h2 className="header__user-name">Артур Королёв</h2>
            <p className="header__user-job">Партнер</p>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
