import React from 'react';
import Header from '../Header/Header';
import Team from '../Team/Team';

function Main({ logout, users, onCardClick }) {
  return (
    <main>
      <Header logout={logout} />
      <Team users={users} onCardClick={onCardClick} />
    </main>
  );
}

export default Main;
