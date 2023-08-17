import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import savePic from '../../images/movie__btn-save-pic.svg';
import savedPic from '../../images/mavie__btn-saved-pic.svg';
import deletePic from '../../images/movie__btn-delete-pic.svg';

function MoviesCard(props) {
  const location = useLocation();

  const [isSaved, setIsSaved] = useState(false);
  const [savedMovieId, setSavedMovieId] = useState(null);

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
      props.onSaveMovie(props);
    } else {
      props.onDeleteSavedMovie(savedMovieId);
    }
  };

  const handleDeleteClick = () => {
    props.onDeleteMovie(props.id);
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
      {props.error && <p className='movie__error-message'>{props.error}</p>}
    </article>
  );
}

export default MoviesCard;