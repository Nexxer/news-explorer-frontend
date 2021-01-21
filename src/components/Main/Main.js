import React from 'react';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';

function Main(props) {

  return (
    <main>
      {props.areResultsShown ? <NewsCardList {...props} /> : ''}
      <About />
    </main>
  );
}

export default Main;
