import React from 'react';
import './SearchForm.css';

function SearchForm() {
  return (
    <form noValidate className="search-form">
        <div className="search-form__container">
          <input className="search-form__input" type="text" name="search" placeholder=" Фильм" required/>
          <button className="search-form__btn" />
        </div>
        <div class="search-form__toggle-container">
          <label className="search-form__toggle">
            <input className="search-form__checkbox-input" type="checkbox" />
            <span class="search-form__checkbox-inner"></span>
          </label>
          <p className='search-form__checkbox-text'>Короткометражки</p>
        </div>
      </form>
  );
}

export default SearchForm;