import React from 'react';
import Card from '../Card/Card';
import './Team.css';
import buttonArrow from '../../assets/img/team-button-arrow.svg';

const arr = [
  {
    _id: 1,
    name: 'Ольга Ильинаааааааа',
    link: 'https://funart.pro/uploads/posts/2022-06/1654154115_27-funart-pro-p-olen-v-tundre-zhivotnie-krasivo-foto-28.jpg',
    job: 'partner',
    description: 'описание',
  },
  {
    _id: 2,
    name: 'Ольга Ильина',
    link: 'https://funart.pro/uploads/posts/2022-06/1654154115_27-funart-pro-p-olen-v-tundre-zhivotnie-krasivo-foto-28.jpg',
    job: 'partner',
    description: 'описание',
  },
  {
    _id: 3,
    name: 'Ольга Ильина',
    link: 'https://funart.pro/uploads/posts/2022-06/1654154115_27-funart-pro-p-olen-v-tundre-zhivotnie-krasivo-foto-28.jpg',
    job: 'partner',
    description: 'описание',
  },
  {
    _id: 4,
    name: 'Ольга Ильина',
    link: 'https://funart.pro/uploads/posts/2022-06/1654154115_27-funart-pro-p-olen-v-tundre-zhivotnie-krasivo-foto-28.jpg',
    job: 'partner',
    description: 'описание',
  },
  {
    _id: 5,
    name: 'Ольга Ильина',
    link: 'https://funart.pro/uploads/posts/2022-06/1654154115_27-funart-pro-p-olen-v-tundre-zhivotnie-krasivo-foto-28.jpg',
    job: 'partner',
    description: 'описание',
  },
  {
    _id: 6,
    name: 'Ольга Ильина',
    link: 'https://funart.pro/uploads/posts/2022-06/1654154115_27-funart-pro-p-olen-v-tundre-zhivotnie-krasivo-foto-28.jpg',
    job: 'partner',
    description: 'описание',
  },
  {
    _id: 7,
    name: 'Ольга Ильина',
    link: 'https://funart.pro/uploads/posts/2022-06/1654154115_27-funart-pro-p-olen-v-tundre-zhivotnie-krasivo-foto-28.jpg',
    job: 'partner',
    description: 'описание',
  },
  {
    _id: 8,
    name: 'Ольга Ильина',
    link: 'https://funart.pro/uploads/posts/2022-06/1654154115_27-funart-pro-p-olen-v-tundre-zhivotnie-krasivo-foto-28.jpg',
    job: 'partner',
    description: 'описание',
  },
];

function Team() {
  return (
    <section className="team">
      <ul className="team__list">
        {arr.map((card) => (
          <Card
            key={card._id}
            card={card}
            // onCardClick={onCardClick}
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
