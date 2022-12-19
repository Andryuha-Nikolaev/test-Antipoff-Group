import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as api from '../../utils/MainApi';
import Header from '../Header/Header';
import './User.css';
import telImg from '../../assets/img/tel-img.svg';
import emailImg from '../../assets/img/email-img.svg';

function User({ logout, onEditAvatar }) {
  const { pathname } = useLocation();

  const [user, setUser] = useState({});

  const currentUrl = document.location.pathname.slice(6);

  useEffect(() => {
    window.scrollTo(0, 0);
    api
      .getUser(currentUrl)
      .then((profileInfo) => {
        setUser(profileInfo);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <Header logout={logout} card={user} onEditAvatar={onEditAvatar} />
      <section className="user">
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
