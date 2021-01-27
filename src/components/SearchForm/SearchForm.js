import React, { useEffect, useCallback } from 'react';
import { useFormWithValidation } from '../../utils/Validation';
import './SearchForm.css';

function SearchForm(props) {

  const { values, handleInputChange, resetForm } = useFormWithValidation();

  const { searchInput } = values;

  const handleSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      props.handleSearchFormSubmit(searchInput);
      resetForm();
    },
    [props, searchInput],
  );

  useEffect(() => {
    resetForm();
    //eslint-disable-next-line
  }, []);

  return (
    <section className="search" >
      <h2 className="search__title">Что творится в мире?</h2>
      <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>

      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="text"
          name="searchInput"
          id="search"
          placeholder="Введите тему новости"
          value={searchInput || ''}
          onChange={handleInputChange}
          inputMode="search"
          required />
        <button className="search__btn" type="submit">Искать</button>
      </form>

    </section >
  );
}

export default SearchForm;