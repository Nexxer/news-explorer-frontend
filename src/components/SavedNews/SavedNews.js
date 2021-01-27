import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews(props) {
  return (
    <NewsCardList      {...props} />
  );
}

export default SavedNews;