import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

function SearchForm({ onSearchSubmit, shortFilmChecked, setShortFilmChecked, onCheckboxChange, initialSearchText }) {
  const [searchText, setSearchText] = useState(initialSearchText || '');
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation(); 

  const handleInputChange = (evt) => {
    setSearchText(evt.target.value);
    setIsErrorVisible(false);

    if (location.pathname === '/movies') {
      localStorage.setItem('searchText', evt.target.value);
    }
  };

  const handleCheckboxChange = (evt) => {
    setShortFilmChecked(evt.target.checked);
    onCheckboxChange(evt.target.checked);

    if (location.pathname === '/movies') {
      localStorage.setItem('shortFilmChecked', evt.target.checked);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (isSubmitting) {
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      if (!searchText.trim()) {
        setIsErrorVisible(true);
      } else {
        await onSearchSubmit(searchText);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <form noValidate className='search-form' onSubmit={handleSubmit}>
        {isErrorVisible && <p className='search-form__error-text'>Нужно ввести ключевое слово</p>}
        <div className='search-form__container'>
          <input
            className='search-form__input'
            type='text'
            name='search'
            placeholder='Фильм'
            required
            value={searchText}
            onChange={handleInputChange}
          />
          <button className='search-form__btn' type='submit' />
        </div>
        <div className='search-form__toggle-container'>
          <label className='search-form__toggle'>
            <input 
              className='search-form__checkbox-input' 
              type='checkbox' 
              checked={shortFilmChecked}
              onChange={handleCheckboxChange}
            />
            <span className='search-form__checkbox-inner'></span>
          </label>
          <p className='search-form__checkbox-text'>Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
