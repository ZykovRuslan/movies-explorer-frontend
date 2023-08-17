import React, { useState, useEffect, useRef } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { moviesApi, mainApi } from '../../utils';
import Preloader from '../Preloader/Preloader';

function Movies({ isLoggedIn }) {
  const [moviesData, setMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [savedMovies, setSavedMovies] = useState([]);
  const [shortFilmChecked, setShortFilmChecked] = useState(false);
  const [filteredMoviesData, setFilteredMoviesData] = useState([]);
  const [displayedCards, setDisplayedCards] = useState(maxAllowedCardsDisplay());
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const searchTextRef = useRef('');

  useEffect(() => {
    if (isLoggedIn) {
      setError(null);

      mainApi.getInitialCards()
        .then((data) => {
          setSavedMovies(data);
        })
        .catch((error) => {
          setError('Ошибка при получении сохраненных фильмов');
        });

      const savedSearchText = localStorage.getItem('searchText');
      const savedShortFilmChecked = localStorage.getItem('shortFilmChecked') === 'true';
      const savedFilteredMoviesData = localStorage.getItem('filteredMoviesData');

        if (savedSearchText) {
          searchTextRef.current = savedSearchText;
        }

        if (savedShortFilmChecked) {
          setShortFilmChecked(savedShortFilmChecked);
        }
      
        if (savedFilteredMoviesData) {
          setFilteredMoviesData(JSON.parse(savedFilteredMoviesData));
        }

        const savedMoviesData = JSON.parse(localStorage.getItem('filteredMoviesData'));
        if (savedMoviesData) {
          setMoviesData(savedMoviesData);
          const filteredData = filterMovies(savedMoviesData, savedShortFilmChecked);
          setFilteredMoviesData(filteredData);
        }
    }
  }, [isLoggedIn]);

  const filterMovies = (data, shortFilmChecked) => {
    let filteredData = [...data];
  
    if (shortFilmChecked) {
      filteredData = filteredData.filter(movie => movie.duration <= 40);
    }
  
    if (searchTextRef.current.trim() !== '') {
      const searchTerm = searchTextRef.current.toLowerCase();
      filteredData = filteredData.filter(movie =>
        movie.nameRU.toLowerCase().includes(searchTerm) || movie.nameEN.toLowerCase().includes(searchTerm)
      );
    }

    return filteredData;
  };  

  const handleSearchSubmit = (searchText) => {
    searchTextRef.current = localStorage.getItem('searchText').toLowerCase();;
    setIsLoading(true);
    setError(null);
    setDisplayedCards(maxAllowedCardsDisplay());

    if (moviesData.length > 0) {
      const filteredData = filterMovies(moviesData, shortFilmChecked);
      setFilteredMoviesData(filteredData);

      if (filteredData.length === 0) {
        setError('Ничего не найдено');
      } else {
        setError(null);
      }

      setIsLoading(false);
      return;
    }

    moviesApi.getMovies(searchText)
      .then((data) => {
        let filteredData = filterMovies(data, shortFilmChecked);
        
        setMoviesData(data);
        setFilteredMoviesData(filterMovies(filteredData));

        if (searchText.trim() !== '') {
          const searchTerm = searchText.toLowerCase();
          data = data.filter(movie =>
            movie.nameRU.toLowerCase().includes(searchTerm) || movie.nameEN.toLowerCase().includes(searchTerm)
          );
        }

        if (filterMovies(data).length === 0) {
          setError('Ничего не найдено');
        } else {
          setError(null);
        }

        localStorage.setItem('searchText', searchText);
        localStorage.setItem('shortFilmChecked', shortFilmChecked);
        localStorage.setItem('filteredMoviesData', JSON.stringify(filteredData));

        setMoviesData(data);
      })
      .catch(() => {
        setError(`Во время запроса произошла ошибка. Возможно, 
        проблема с соединением или сервер недоступен. 
        Подождите немного и попробуйте ещё раз.`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddToSavedMovies = (movie) => {
    mainApi
      .addNewCard({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        thumbnail: movie.thumbnail,
        owner: movie.owner,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
      })
      .then(savedMovie => {
        setSavedMovies([...savedMovies, savedMovie]);
        setFilteredMoviesData(prevData => [...prevData, savedMovie]);
        setSelectedMovieId(savedMovie.movieId);
      })
      .catch(() => {
        setError('Ошибка при сохранении фильма');
      });
  };

  const handleRemoveFromSavedMovies = (movieId) => {
    mainApi
      .deleteCard(movieId)
      .then(() => {
        setSavedMovies(prevSavedMovies =>
          prevSavedMovies.filter(movie => movie._id !== movieId)
        );
        setFilteredMoviesData(prevFilteredMovies =>
          prevFilteredMovies.filter(movie => movie._id !== movieId)
        );
        setSelectedMovieId(movieId);
      })
      .catch(() => {
        setError('Ошибка при удалении сохраненного фильма');
      });
  };

  const handleCheckboxChange = (isChecked) => {
    setShortFilmChecked(isChecked);

    if (moviesData.length > 0) {
      const filteredData = filterMovies(moviesData, isChecked);

      const searchTerm = localStorage.getItem('searchText').toLowerCase();
      const filteredBySearch = filteredData.filter(movie =>
      movie.nameRU.toLowerCase().includes(searchTerm) || movie.nameEN.toLowerCase().includes(searchTerm)
      );

      setFilteredMoviesData(filteredBySearch);

      if (filteredBySearch.length === 0) {
        setError('Ничего не найдено');
      } else {
        setError(null);
      }
    }
    
    localStorage.setItem('shortFilmChecked', isChecked);
  };

  function maxAllowedCardsDisplay () {
    const screenWidth = window.innerWidth;
    return screenWidth > 768 ? 12 : screenWidth > 480 ? 8 : 5;
  };

  function addMoreCards () {
    const screenWidth = window.innerWidth;
    return screenWidth > 768 ? 3 : 2;
  };

  const handleLoadMore = () => {
    setDisplayedCards(displayedCards + addMoreCards());
  };

  const updateLoadMoreBtn = (cardsCount) => {
    if (filteredMoviesData.length > cardsCount) {
      setShowLoadMoreBtn(true);
    } else {
      setShowLoadMoreBtn(false);
    }
  };

  useEffect(() => {
    updateLoadMoreBtn(displayedCards);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMoviesData, displayedCards]);

  const handleResize = () => {
    const newDisplayedCards = maxAllowedCardsDisplay();
    setDisplayedCards(newDisplayedCards);
    updateLoadMoreBtn(newDisplayedCards);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      updateLoadMoreBtn(maxAllowedCardsDisplay());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    	<Header isLoggedIn={isLoggedIn}/>
      <main className='movies'>
			  <SearchForm 
          isLoggedIn={isLoggedIn}
          onSearchSubmit={handleSearchSubmit} 
          shortFilmChecked={shortFilmChecked}
          setShortFilmChecked={setShortFilmChecked}
          onCheckboxChange={handleCheckboxChange}
          initialSearchText={localStorage.getItem('searchText')}
        />
        {isLoading ? (
          <Preloader />
        ) : error ? (
          <p className='movies__error-text'>{error}</p>
        ) : (
          <MoviesCardList 
            moviesData={filteredMoviesData.slice(0, displayedCards)} 
            savedMovies={savedMovies} 
            onSaveMovie={handleAddToSavedMovies}
            onDeleteSavedMovie={handleRemoveFromSavedMovies}
            selectedMovieId={selectedMovieId}
            currentRoute='/movies'
          />
        )}
        {showLoadMoreBtn && (
          <button className='movies__btn-follow' type='button' onClick={handleLoadMore}>
            Еще
          </button>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
