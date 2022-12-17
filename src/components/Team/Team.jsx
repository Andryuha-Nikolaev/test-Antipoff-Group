import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import './Team.css';
import buttonArrow from '../../assets/img/team-button-arrow.svg';
import { Link } from 'react-router-dom';

function Team({ users, onCardClick, onCardLike }) {
  const [shownCards, setShownCards] = useState(0);
  const [defaultCards, setDefaultCards] = useState(0);

  function shownCount() {
    const display = window.innerWidth;
    if (display > 1460) {
      setShownCards(8);
      setDefaultCards(8);
    } else if (display > 810) {
      setShownCards(6);
      setDefaultCards(6);
    } else if (display < 810) {
      setShownCards(4);
      setDefaultCards(4);
    }
  }

  useEffect(() => {
    shownCount();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', shownCount);
    return () => window.removeEventListener('resize', shownCount);
  }, []);

  const teamButtonClassName = `team__button ${
    users.length <= defaultCards ? 'team__button_hidden' : ''
  }`;

  return (
    <section className="team">
      <ul className="team__list">
        {users.slice(0, shownCards).map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            // onCardLike={onCardLike}
            // onCardDelete={onCardDelete}
          />
        ))}
      </ul>

      {users.length > shownCards ? (
        <button
          className={teamButtonClassName}
          type="button"
          onClick={() => setShownCards(users.length)}>
          Показать еще
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
