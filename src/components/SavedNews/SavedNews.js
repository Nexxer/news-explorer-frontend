import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews(props) {
  return (
    <div className="content__results">
      <NewsCardList toggleNotFound={props.showAndHideNotFound}
        isLogin={props.isUserlogin} />
    </div>
  );
}

export default SavedNews;