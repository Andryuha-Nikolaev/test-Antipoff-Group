import React from 'react';
import './Card.css';
import cardLike from '../../assets/img/card-like.svg';
import cardLikeActive from '../../assets/img/card-like-active.svg';

function Card({ card }) {
  return (
    <li className="card">
      <img className="card__image" alt={card.name} src={card.link} />
      <h2 className="card__text">{card.name}</h2>
      <button className="card__like-button" type="button" aria-label="поставить лайк">
        <img src={cardLike} alt="кнопка лайк" />
      </button>
    </li>
  );
}

export default Card;
