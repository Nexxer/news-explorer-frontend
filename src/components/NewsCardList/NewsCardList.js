import React from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import { useLocation } from "react-router-dom";
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import Test from '../Test/Test';

function NewsCardList(props) {
  const location = useLocation();
  const isSavedNewsOpen = (location.pathname === '/saved-news');

  return (
    <section className="content__results">
      {isSavedNewsOpen ?
        ''
        : <h2 className="result__title">Результаты поиска</h2>}

      <ul className="cards">
        <NewsCard isUserlogin={props.isLogin} isItSavedNewsPage={isSavedNewsOpen} />
        <NewsCard isUserlogin={props.isLogin} isItSavedNewsPage={isSavedNewsOpen} />
        <NewsCard isUserlogin={props.isLogin} isItSavedNewsPage={isSavedNewsOpen} />
        <NewsCard isUserlogin={props.isLogin} isItSavedNewsPage={isSavedNewsOpen} />
        <NewsCard isUserlogin={props.isLogin} isItSavedNewsPage={isSavedNewsOpen} />
        <Test {...props} />
      </ul>
      <button className="news-list__more-btn" type="button">Показать ещё</button>
      {props.isPreloaderShown ? <Preloader /> : ''}
      {props.isNotFoundShown ? <NotFound /> : ''}
    </section>
  );
}

export default NewsCardList;