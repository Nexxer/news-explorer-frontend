import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader() {
  return (
    <div className="saved-header">
      <h2 className="saved-header__title">Сохранённые статьи</h2>
      <p className="saved-header__subtitle">Грета, у вас 5 сохранённых статей</p>
      <p className="saved-header__text">По ключевым словам: <b>Природа</b>, <b>Тайга</b> и <b>2-м другим</b></p>
    </div>
  );
}

export default SavedNewsHeader;