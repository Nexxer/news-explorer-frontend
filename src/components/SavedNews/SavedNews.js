import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews(props) {
  return (
      <NewsCardList toggleNotFound={props.showAndHideNotFound}
        isLogin={props.isUserlogin} />
  );
}

export default SavedNews;