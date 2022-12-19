import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useScreenWidth from '../../hooks/useScreenWidth';
import Card from '../Card/Card';
import './Team.css';
import buttonArrow from '../../assets/img/team-button-arrow.svg';

function Team({ onCardClick, onCardLike }) {
  const users = useSelector((state) => state.user.users);

  const [defaultCards, setDefaultCards] = useState(0);
  const [shownCards, setShownCards] = useState(0);

  const screenWidth = useScreenWidth();

  function shownCount() {
    if (screenWidth > 1460) {
      setShownCards(8);
      setDefaultCards(8);
    } else if (screenWidth > 810) {
      setShownCards(6);
      setDefaultCards(6);
    } else if (screenWidth < 810) {
      setShownCards(4);
      setDefaultCards(4);
    }
  }

  useEffect(() => {
    shownCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth]);

  const teamButtonClassName = `team__button ${
    users.length <= defaultCards ? 'team__button_hidden' : ''
  }`;

  return (
    <section className="team">
      <ul className="team__list">
        {users.slice(0, shownCards).map((card) => (
          <Card key={card._id} card={card} onCardLike={onCardLike} />
        ))}
      </ul>

      {users.length > shownCards ? (
        <button
          className={teamButtonClassName}
          type="button"
          onClick={() => setShownCards(users.length)}>
          <p className="team__button-text">Показать еще</p>
          <img className="team__button-image" src={buttonArrow} alt="кнопка показать еще" />
        </button>
      ) : (
        <button className={teamButtonClassName} type="button" onClick={() => shownCount()}>
          Свернуть
          <img
            className="team__button-image team__button-image_rotate"
            src={buttonArrow}
            alt="кнопка свернуть"
            onClick={() => shownCount()}
          />
        </button>
      )}
    </section>
  );
}

export default Team;
