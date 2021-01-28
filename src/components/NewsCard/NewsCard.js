import React, { useCallback } from 'react';
import './NewsCard.css';
import { useLocation } from "react-router-dom";
import noPhoto from '../../images/NoPhoto.png';

function NewsCard(props) {
  const location = useLocation();
  const isSavedNewsOpen = (location.pathname === '/saved-news');
  const source = props.card.source
  const keyword = props.card.keyword
  const title = props.card.title
  const text = props.card.text
  const date = props.card.date
  const link = props.card.link
  const image = props.card.image

  let isLiked = Array.isArray(props.savedCardArr) ? props.savedCardArr.some(i => i.link === link) : false;

  const toggleSaveCard = useCallback(() => {
    if (!props.isLogin) {
      return props.onAuthClick();
    }
    if (isLiked || isSavedNewsOpen) {
      isLiked = false;
      return props.delCard(link);
    }
    props.saveCard({ source, keyword, title, text, date, link, image });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isLiked = true;
  }, [isLiked]);

  return (
    <li>
      <figure className="card">
        {props.isItSavedNewsPage ? (
          <>
            <button type="button" className="card__delete-btn" onClick={toggleSaveCard} />
            <p className="card__key-word">{keyword}</p>
          </>
        )

          :
          <button
            type="button"
            onClick={toggleSaveCard}
            className={props.isLogin ?
              (isLiked ?
                "card__save-btn card__save-btn_login card__save-btn_blue"
                : "card__save-btn card__save-btn_login"
              ) : "card__save-btn"
            }
            />
        }
        <a href={link} className="card__link">
          <img id="newsPhoto" className="card__photo" src={image ? image : noPhoto} alt="фото новости" />

          <figcaption className="card__cap">
            <p className="card__date">{date}</p>
            <h2 className="card__title">{title}</h2>
            <p className="card__abstract">{text}</p>
            <p className="card__source">{source}</p>
          </figcaption>
        </a>

      </figure>
    </li>
  );
}

export default NewsCard;

