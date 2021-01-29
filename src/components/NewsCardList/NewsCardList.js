import React, { useCallback, useEffect, useState } from 'react';
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';
import { useLocation } from "react-router-dom";

function NewsCardList(props) {
  const location = useLocation();
  const isSavedNewsOpen = (location.pathname === '/saved-news');
  const [cardsToRender, setCardsToRender] = useState([]);
  const [cardsToRenderAmount, setCardsToRenderAmount] = useState(3);
  const [buttonMoreShow, setButtonMoreShow] = useState(true)
  const [contentHidden, setContentHidden] = useState(true)

  const handleClickShowMoreButton = useCallback(() => {
    let cardsAmount;
    if (!isSavedNewsOpen) {
      if (props.resultFromSearch.length - cardsToRenderAmount > 3) {
        cardsAmount = cardsToRenderAmount + 3;
      } else {
        cardsAmount = cardsToRenderAmount + (props.resultFromSearch.length - cardsToRenderAmount);
        setButtonMoreShow(false)
      }
    } else {
      if (props.savedNews.length - cardsToRenderAmount > 3) {
        cardsAmount = cardsToRenderAmount + 3;
      } else {
        cardsAmount = cardsToRenderAmount + (props.savedNews.length - cardsToRenderAmount);
        setButtonMoreShow(false)
      }
    }
    setCardsToRenderAmount(cardsAmount);
  }, [isSavedNewsOpen, props.resultFromSearch, props.savedNews, cardsToRenderAmount]);

  useEffect(() => {
    if (isSavedNewsOpen) {
      if (props.savedNews.length === 0) {
        return setContentHidden(true);
      }
      return setContentHidden(false);
    }
    return setContentHidden(false);
  }, [isSavedNewsOpen, props.savedNews])

  useEffect(() => {
    if (isSavedNewsOpen) {
      if (props.savedNews.length < 4) {
        setButtonMoreShow(false)
      }
      setCardsToRender(props.savedNews.slice(0, cardsToRenderAmount));
    } else {
      setCardsToRender(props.resultFromSearch.slice(0, cardsToRenderAmount));
    }
  }, [cardsToRenderAmount, isSavedNewsOpen, props.resultFromSearch, props.savedNews]);

  return (
    <>
      {contentHidden ? '' :
        <section className="content__results">
          {isSavedNewsOpen ? '' : <h2 className="result__title">Результаты поиска</h2>}
          <ul className="cards">
            {cardsToRender.map((card) => {
              return (
                <NewsCard
                  isUserlogin={props.isLogin}
                  isItSavedNewsPage={isSavedNewsOpen}
                  key={card.link}
                  card={card}
                  saveCard={props.saveCard}
                  isLogin={props.isLogin}
                  savedCardArr={props.saveCardArr}
                  delCard={props.delCard}
                  onAuthClick={props.onAuthClick}
                />)
            })}
          </ul>
          {buttonMoreShow ?
            <button className="news-list__more-btn" type="button" onClick={handleClickShowMoreButton}>Показать ещё</button>
            : ''}
        </section >
      }
    </>
  );
}

export default NewsCardList;