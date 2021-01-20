import React from 'react';
import './PreLoader.css';

function PreLoader() {
  return (
    <div className="preloader">
      <i className="preloader__spin" />
      <p className="preloader__text">Идет поиск новостей...</p>
    </div>
  );
}

export default PreLoader;