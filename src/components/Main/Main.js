import React from 'react';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import PreLoader from '../PreLoader/PreLoader';
import NotFound from '../NotFound/NotFound';

function Main(props) {

  return (
    <main>
      { props.isPreloaderShown ? <PreLoader /> : ''}
      { props.isNotFoundShown ? <NotFound searchFailed={props.searchFailed}/> : '' }
      {props.areResultsShown ? <NewsCardList {...props} /> : ''}
      <About />
    </main>
  );
}

export default Main;
