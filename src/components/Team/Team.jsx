import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import './Team.css';
import buttonArrow from '../../assets/img/team-button-arrow.svg';
import { Link } from 'react-router-dom';

function Team({ users, onCardClick }) {
  return (
    <section className="team">
      <ul className="team__list">
        {users.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            // onCardLike={onCardLike}
            // onCardDelete={onCardDelete}
          />
        ))}
      </ul>
      <button className="team__button" type="button">
        Показать еще
        <img className="team__button-image" src={buttonArrow} alt="кнопка показать еще" />
      </button>
    </section>
  );
}

export default Team;
