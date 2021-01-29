import React from 'react';
import './NotFound.css';
import notFoundImg from '../../images/NotFound.png';

function NotFound(props) {
  return (
    <div className="not-found">
      {props.searchFailed ?
        <p>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>
        : (
          <>
            <img src={notFoundImg} alt="😕" className="not-found__img" />
            <h3 className="not-found__title">Ничего не найдено</h3>
            <p className="not-found__subtitle">К сожалению по вашему запросу ничего не найдено.</p>
          </>)}
    </div>
  );
}

export default NotFound;