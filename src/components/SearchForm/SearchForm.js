import React from 'react';
import './SearchForm.css';

function SearchForm() {
  return (
    <section>
      <form noValidate className="search-form">
        <div className="search-form__container">
          <input className="search-form__input" type="text" name="search" placeholder="Фильм" required/>
          <button className="search-form__btn" type='submit'/>
        </div>
        <div className="search-form__toggle-container">
          <label className="search-form__toggle">
            <input className="search-form__checkbox-input" type="checkbox" />
            <span className="search-form__checkbox-inner"></span>
          </label>
          <p className='search-form__checkbox-text'>Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;