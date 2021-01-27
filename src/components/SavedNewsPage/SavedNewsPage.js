import React from 'react';
import Header from '../Header/Header';
import SavedNews from '../SavedNews/SavedNews';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';

function SavedNewsPage(props) {
  return (
    <>
      <div className="page__header_saved-news">
        <Header
          onMenuClick={props.onMenuClick}
          isMenuShown={props.isMenuShown}
          isLogin={props.isLogin}
          isFontDark={true}
          onAuthClick={props.onAuthClick}
          makelogin={props.makelogin}
          onLogoutClick={props.onLogoutClick}
          closeMenuOnclick={props.closeMenuOnclick}

        />
        <SavedNewsHeader
          savedNews={props.savedNews}
        />
      </div>
      <SavedNews
        showAndHideNotFound={props.showAndHideNotFound}
        isUserlogin={true}
        savedNews={props.savedNews}
        delCard={props.delCard}
        isLogin={true}
      />
    </>
  )
}

export default SavedNewsPage;