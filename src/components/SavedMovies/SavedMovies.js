import React, { useState, useEffect, useRef } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardListSaved from '../MoviesCardListSaved/MoviesCardListSaved';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { mainApi } from '../../utils';

function SavedMovies({ isLoggedIn }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [shortFilmChecked, setShortFilmChecked] = useState(false);

  const searchTextRef = useRef('');

  useEffect(() => {
    setIsLoading(true);

    mainApi
      .getInitialCards()
        .then(savedMoviesData => {
        setSavedMovies(savedMoviesData);
        setFilteredMovies(savedMoviesData); 
        setIsLoading(false);
      })
      .catch(() => {
        setError('Ошибка при получении сохраненных фильмов');
        setIsLoading(false);
      });
  }, []);

  const filterMovies = (data, shortFilmChecked) => {
    let filteredData = [...data];
  
    if (shortFilmChecked) {
      filteredData = filteredData.filter(movie => movie.duration <= 40);
    }
  
    if (searchTextRef.current.trim() !== '') {
      const searchTerm = searchTextRef.current.toLowerCase();
      filteredData = filteredData.filter(movie =>
        movie.nameRU.toLowerCase().includes(searchTerm) ||
        movie.nameEN.toLowerCase().includes(searchTerm)
      );
    }
  
    return filteredData;
  };  

  const handleSearchSubmit = (searchText) => {
    searchTextRef.current = searchText;
    setIsLoading(true);
    setError(null);
  
    const filteredData = filterMovies(savedMovies, shortFilmChecked);
  
    if (searchText.trim() !== '') {
      const searchTerm = searchText.toLowerCase();
      const filteredByText = filteredData.filter(movie =>
        movie.nameRU.toLowerCase().includes(searchTerm) || movie.nameEN.toLowerCase().includes(searchTerm)
      );
      setFilteredMovies(filteredByText);
    } else {
      setFilteredMovies(filteredData);
    }

    if (filteredData.length === 0) {
        setError('Ничего не найдено');
      } else {
        setError(null);
      }
  
    setIsLoading(false);
  };
  

  const handleDeleteMovie = (movieId) => {
    mainApi
      .deleteCard(movieId)
      .then(() => {
        setSavedMovies(prevSavedMovies =>
          prevSavedMovies.filter(movie => movie._id !== movieId)
        );
        setFilteredMovies(prevFilteredMovies =>
          prevFilteredMovies.filter(movie => movie._id !== movieId)
        );
      })
      .catch(() => {
        setError('Ошибка при удалении сохраненного фильма');
      });
  };

  const handleCheckboxChange = (isChecked) => {
    const filteredData = filterMovies(savedMovies, isChecked);
    setShortFilmChecked(isChecked);
    setFilteredMovies(filteredData);
    
    if (filteredData.length === 0) {
      setError('Ничего не найдено');
    } else {
      setError(null);
    }
  };

  return (
    <>
    	<Header isLoggedIn={isLoggedIn}/>
      <main className='saved-movies'>
			  <SearchForm 
          onSearchSubmit={handleSearchSubmit} 
          shortFilmChecked={shortFilmChecked}
          setShortFilmChecked={setShortFilmChecked}
          onCheckboxChange={handleCheckboxChange}
        />
        {isLoading ? (
          <Preloader />
        ) : error ? (
          <p className='saved-movies__error-text'>{error}</p>
        ) : (
          <MoviesCardListSaved 
            savedMovies={filteredMovies} 
            onDeleteMovie={handleDeleteMovie} 
            currentRoute='/saved-movies'
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
