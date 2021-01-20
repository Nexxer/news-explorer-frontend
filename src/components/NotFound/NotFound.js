import React from 'react';
import './NotFound.css';
import notFoundImg from '../../images/NotFound.png';

function NotFound() {
  return (
      <div className="not-found">
        <img src={notFoundImg} alt="😕" className="not-found__img"/>
        <h3 className="not-found__title">Ничего не найдено</h3>
        <p className="not-found__subtitle">К сожалению по вашему запросу ничего не найдено.</p>
      </div>
  );
}

export default NotFound;