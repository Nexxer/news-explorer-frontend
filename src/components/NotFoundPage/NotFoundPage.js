import React from 'react';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h2 className="not-found-page__title">404</h2>
      <p className="not-found-page__text">Страница не найдена</p>
      <p className="not-found-page__text">То что вы ищите, не существует</p>
    </div>
  )
};

export default NotFoundPage;
