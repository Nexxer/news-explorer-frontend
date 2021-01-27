import React, { useCallback } from 'react';
import './SavedNewsHeader.css';
import { CurrentUserContext } from './../../context/CurrentUserContext';
import { pluralize } from './../../utils/Pluralize'
import { sortArrKeyWords } from './../../utils/SortKeyWords'


function SavedNewsHeader(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const configArticlesSaved = {
    zero: ', у Вас нет сохраненных статей',
    one: ', у Вас {} сохраненная статья',
    few: ', у Вас {} сохраненные статьи',
    many: ', у Вас {} сохраненных статей',
    radix: 10,
    fewMax: 4,
  };

  const savedText = (props.savedNews.message ? ', у Вас нет сохраненных статей' : pluralize(props.savedNews.length, configArticlesSaved))

  const getKeywordsListSortedByPopularity = useCallback((articlesArray) => {
    const keywordsWithRangeNumber = articlesArray
      .map((article) => article.keyword)
      .reduce((acc, keyword) => {
        if (!acc[keyword]) {
          acc[keyword] = 1;
        } else {
          acc[keyword] += 1;
        }
        return acc;
      }, {});
    const filteredKeywordsArray = Object.keys(keywordsWithRangeNumber);
    const result = filteredKeywordsArray.sort((a, b) => {
      return keywordsWithRangeNumber[b] - keywordsWithRangeNumber[a];
    });
    return result;
  }, []);

  const keywordsList = (props.savedNews.message ? [] : getKeywordsListSortedByPopularity(props.savedNews));
  const firstKeyword = keywordsList[0];
  const secondKeyword = keywordsList[1];
  const thirdKeyword = keywordsList[2];
  const byKeyWordsFragment = keywordsList.length === 1 ? 'По ключевому слову: ' : 'По ключевым словам: ';

  return (
    <div className="saved-header">
      <h2 className="saved-header__title">Сохранённые статьи</h2>
      <p className="saved-header__subtitle">{`${currentUser.name}${savedText}`}</p>
      <p className="saved-header__text">

        {keywordsList.length ? byKeyWordsFragment : ''}
        <b className="saved-news-info__keywords saved-news-info__keywords_accent_bold">
          {firstKeyword} {secondKeyword ? `, ${secondKeyword}` : ''}
        </b>
        {keywordsList.length > 2 ? ' и ' : ''}
        <b className="saved-news-info__keywords saved-news-info__keywords_accent_bold">
          {keywordsList.length > 3
            ? ` ${keywordsList.length - 2} другим`
            : `${thirdKeyword || ''}`}
        </b>
      </p>
    </div>
  );
}

export default SavedNewsHeader;