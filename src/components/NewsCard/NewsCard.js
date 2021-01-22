import React, { useCallback } from 'react';
import './NewsCard.css';
import newsImg from '../../images/georgia-de-lotz--UsJoNxLaNo-unsplash.png';

function NewsCard({ isUserlogin, isItSavedNewsPage }) {
  const [isSaved, setSaved] = React.useState(false);

  const toggleSaveCard = useCallback(() => {
    setSaved(!isSaved);
  }, [isSaved]);
  return (
    <li>
      <figure className="card">
        {isItSavedNewsPage ? (
          <>
            <button type="button" className="card__delete-btn" />
            <p className="card__key-word">Тема</p>
          </>
        )

          :
          <button
            type="button"
            onClick={toggleSaveCard}
            className={isUserlogin ?
              (isSaved ?
                "card__save-btn card__save-btn_login card__save-btn_blue"
                : "card__save-btn card__save-btn_login"
              ) : "card__save-btn"
            }
            disabled={isUserlogin ? false : true} />
        }
        <img className="card__photo" src={newsImg} alt="фото новости" />

        <figcaption className="card__cap">
          <p className="card__date">32 февраля, 2022</p>
          <h2 className="card__title">Какой-то заголовок</h2>
          <p className="card__abstract">Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec varius velit diam, at dictum mi blandit nec.
          Donec lobortis placerat.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius velit diam, at dictum mi blandit nec. Donec lobortis placerat.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec varius velit diam, at dictum mi blandit nec. Donec lobortis placerat.</p>
          <p className="card__source">Правда</p>
        </figcaption>
      </figure>
    </li>
  );
}

export default NewsCard;

