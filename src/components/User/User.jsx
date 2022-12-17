import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import * as api from '../../utils/MainApi';
import './User.css';
import telImg from '../../assets/img/tel-img.svg';
import emailImg from '../../assets/img/email-img.svg';

function User({ logout, user, users }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header logout={logout} card={user} />
      <section className="user">
        {/* {currentUser._id === user._id ? <p>яяяяяяя</p> : <p>не я</p>} */}
        <p className="user__description">
          Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых
          продуктов, включая такие аспекты, как организационная структура, процессы, аналитика и
          ИТ-компоненты. Он помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать
          процессы за счет применения новейших технологий и увеличивать продажи, используя самые
          современные аналитические инструменты.
          <br />
          <br />
          В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться
          с трудностями. Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных
          моментов — это осознание того, что ты помог клиенту перейти на совершенно новый уровень
          компетентности, уверенность в том, что после окончания проекта у клиента есть все
          необходимое, чтобы дальше развиваться самостоятельно".
          <br />
          <br />
          Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную
          предпринимательскую деятельность. Он является совладельцем сети клиник эстетической
          медицины в Швейцарии, предлагающей инновационный подход к красоте, а также инвестором
          других бизнес-проектов.
        </p>
        <ul className="user__contacts">
          <li className="user__contacts-item">
            <img className="user__tel-img" src={telImg} alt="иконка телефона" />
            +7 (954) 333-44-55
          </li>
          <li className="user__contacts-item">
            <img className="user__email-img" src={emailImg} alt="иконка маил" />
            {user.email}
          </li>
        </ul>
      </section>
    </>
  );
}

export default User;
