import React from 'react';
import Header from '../Header/Header';
import Team from '../Team/Team';

function Main({ logout, users, onCardClick, onCardLike, onAccountClick }) {
  return (
    <main>
      <Header logout={logout} onAccountClick={onAccountClick} />
      <Team users={users} onCardClick={onCardClick} onCardLike={onCardLike} />
    </main>
  );
}

export default Main;
