import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import savePic from '../../images/movie__btn-save-pic.svg';
import savedPic from '../../images/mavie__btn-saved-pic.svg';
import deletePic from '../../images/movie__btn-delete-pic.svg';

function MoviesCard({link, name, timeOfTheFilm, isSave}) {
  const location = useLocation();

  return (
    <article className='movie'>
      <a className='movie__link' href='заглушка' target='_blank' rel='noreferrer'>
        <img src={link} className='movie__image' alt={name} />
      </a>
      <div className='movie__align'>
        <h2 className='movie__title'>{name}</h2>
        <span className='movie__time'>{timeOfTheFilm}</span>
      </div>
      {location.pathname === '/movies' &&
        <button className={isSave ? 'movie__btn-save' : 'movie__btn-saved'} aria-label='сохранить'>
          {isSave ? <img className="movie__btn-save-pic" alt='добавить в сохраненные' src={savePic} /> :
          <img className='movie__btn-saved-pic' alt='добавлено в сохраненные' src={savedPic} />}
        </button>
      }
      {location.pathname === '/saved-movies' &&
        <button className='movie__btn-delete' aria-label='удалить фильм'>
          <img className='movie__btn-delete-pic' alt='удалить' src={deletePic} />
        </button>
      }
    </article>
  );
}

export default MoviesCard;