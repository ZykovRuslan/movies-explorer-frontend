import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import savePic from '../../images/movie__btn-save-pic.svg';
import savedPic from '../../images/mavie__btn-saved-pic.svg';
import deletePic from '../../images/movie__btn-delete-pic.svg';
import { mainApi } from '../../utils';

function MoviesCard(props) {
  const location = useLocation();

  const [isSaved, setIsSaved] = useState(props.saved);
  const [savedMovieId, setSavedMovieId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.pathname === '/movies') {
      const isMovieSaved = props.savedMovies.some(savedMovie => savedMovie.movieId === props.movieId);
      setIsSaved(isMovieSaved);
  
      if (isMovieSaved) {
        const savedMovie = props.savedMovies.find(savedMovie => savedMovie.movieId === props.movieId);
        setSavedMovieId(savedMovie._id);
      }
    }
  }, [props.savedMovies, props.movieId, location.pathname]);

  const handleSaveClick = () => {
    if (!isSaved) {
      mainApi
        .addNewCard({
          country: props.country,
          director: props.director,
          duration: props.duration,
          year: props.year,
          description: props.description,
          image: props.image,
          trailerLink: props.trailerLink,
          thumbnail: props.thumbnail,
          owner: props.owner,
          movieId: props.movieId,
          nameRU: props.nameRU,
          nameEN: props.nameEN
        })
        .then( savedMovie => {
          props.onAddToSavedMovies(savedMovie);
          setIsSaved(true);
          setSavedMovieId(savedMovie._id);
        })
        .catch(() => {
          setError('Ошибка при сохранении фильма');
        });
    } else {
        mainApi
          .deleteCard(savedMovieId)
          .then(() => {
            setIsSaved(false);
            props.removeFromSavedMovies(props.movieId);
          })
          .catch(() => {
            setError('Ошибка при удалении сохраненного фильма');
          });
      }
  };

  const handleDeleteClick = () => {
    mainApi
      .deleteCard(props.id)
      .then(() => {
        setIsSaved(false);
        props.onDeleteMovie(props.id);
      })
      .catch(() => {
        setError('Ошибка при удалении сохраненного фильма');
      });
  }

  function durationFilm (duration) {
    if (duration < 60) return `${duration}м`
    return `${Math.floor(duration/60)}ч 
    ${(duration-(Math.floor(duration/60)*60)) !== 0 ? duration-(Math.floor(duration/60)*60)+'м' : ''}`
  }

  return (
    <article className='movie'>
      <a className='movie__link' href={props.trailerLink} target='_blank' rel='noreferrer'>
        <img src={props.image} className='movie__image' alt={props.nameRU} />
      </a>
      <div className='movie__align'>
        <h2 className='movie__title'>{props.nameRU}</h2>
        <span className='movie__time'>{durationFilm(props.duration)}</span>
      </div>
      {location.pathname === '/movies' &&
        <button 
          className={isSaved ? 'movie__btn-saved' : 'movie__btn-save'} 
          aria-label='сохранить' 
          type='button' 
          onClick={handleSaveClick}
        >
          {isSaved ? <img className="movie__btn-saved-pic" alt='добавить в сохраненные' src={savedPic} /> :
          <img className='movie__btn-save-pic' alt='добавлено в сохраненные' src={savePic} />}
        </button>
      }
      {location.pathname === '/saved-movies' &&
        <button 
          className='movie__btn-delete' 
          aria-label='удалить фильм' 
          type='button'
          onClick={handleDeleteClick}
        >
          <img className='movie__btn-delete-pic' alt='удалить' src={deletePic} />
        </button>
      }
      {error && <p className='movie__error-message'>{error}</p>}
    </article>
  );
}

export default MoviesCard;