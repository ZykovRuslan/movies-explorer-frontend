import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesData, savedMovies, onSaveMovie, onDeleteSavedMovie, savedMovieId, selectedMovieId }) {

  return (
    <section className='galery' aria-label='секция с фильмами'>
      {moviesData.map(movie => (
          <MoviesCard
            key={movie.id}
            nameRU={movie.nameRU}
            duration={movie.duration}
            trailerLink={movie.trailerLink}
            country={movie.country}
            director={movie.director}
            year={movie.year}
            description={movie.description}
            image={`https://api.nomoreparties.co/${movie.image.url}`}
            thumbnail={`https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`}
            owner={movie.owner}
            movieId={movie.id}
            nameEN={movie.nameEN}
            savedMovies={savedMovies}
            onSaveMovie={onSaveMovie}
            onDeleteSavedMovie={onDeleteSavedMovie}
            id={movie._id}
            selectedMovieId={selectedMovieId}
        />
      ))}
    </section>
  );
}

export default MoviesCardList;
