import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Card.css';
import cardLike from '../../assets/img/card-like.svg';
import cardLikeActive from '../../assets/img/card-like-active.svg';

function Card({ card, onCardClick, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);

  console.log(currentUser);

  const isLiked = card.likes.some((i) => i === currentUser._id);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <div className="card-container">
      <Link className="card" to="/user" onClick={handleCardClick}>
        <img className="card__image" alt={card.name} src={card.avatar} />
        <h2 className="card__text">{card.name}</h2>
      </Link>
      <button
        className="card__like-button"
        type="button"
        aria-label="поставить лайк"
        onClick={handleLikeClick}>
        <img src={isLiked ? cardLikeActive : cardLike} alt="кнопка лайк" />
      </button>
    </div>
  );
}

export default Card;
