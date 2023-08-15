import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardListSaved({ savedMovies, onDeleteMovie }) {

  return (
    <section className='galery' aria-label='секция с фильмами'>
      {savedMovies.map(movie => (
          <MoviesCard
            key={movie._id}
            nameRU={movie.nameRU}
            duration={movie.duration}
            trailerLink={movie.trailerLink}
            country={movie.country}
            director={movie.director}
            year={movie.year}
            description={movie.description}
            image={movie.image}
            thumbnail={movie.thumbnail}
            owner={movie.owner}
            movieId={movie.id}
            nameEN={movie.nameEN}
            onDeleteMovie={onDeleteMovie}
            id={movie._id}
        />
      ))}
    </section>
  );
}

export default MoviesCardListSaved;
