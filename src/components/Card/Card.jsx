import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Card.css';
import cardLike from '../../assets/img/card-like.svg';
import cardLikeActive from '../../assets/img/card-like-active.svg';

function Card({ card, onCardClick }) {
  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <Link to="/user" className="card" onClick={handleCardClick}>
      <img className="card__image" alt={card.name} src={card.avatar} />
      <h2 className="card__text">{card.name}</h2>
      <button className="card__like-button" type="button" aria-label="поставить лайк">
        <img src={cardLike} alt="кнопка лайк" />
      </button>
    </Link>
  );
}

export default Card;
