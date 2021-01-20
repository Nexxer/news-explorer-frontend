import React from 'react';
import './SearchForm.css';

function SearchForm(props) {
  return (
    <section className="search" >
      <h2 className="search__title">Что творится в мире?</h2>
      <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
      <form className="search__form">
        <input className="search__input" type="text" name="searth-text" id="search" placeholder="Введите тему новости" required />
        <button className="search__btn" type="button" onClick={props.onSearch}>Искать</button>
      </form>
    </section >
  );
}

export default SearchForm;