import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Card.css';
import cardLike from '../../assets/img/card-like.svg';
import cardLikeActive from '../../assets/img/card-like-active.svg';

function Card({ card, onCardLike }) {
  const currentUser = useSelector((state) => state.user.currentUser);

  const isLiked = card.likes.some((i) => i === currentUser._id);

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <div className="card__container">
      <Link className="card" to={`/user/${card._id}`}>
        <img className="card__image" alt={card.name} src={card.avatar} />
        <h2 className="card__text">{card.name}</h2>
      </Link>
      {/* <div className="card">
        <img className="card__image" alt={card.name} src={card.avatar} />
        <h2 className="card__text">{card.name}</h2>
      </div> */}
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
