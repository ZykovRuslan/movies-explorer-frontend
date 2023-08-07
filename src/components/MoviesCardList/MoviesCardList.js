import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList() {
  const location = useLocation();
  const movies = [
    {
      link: 'https://avatars.mds.yandex.net/i?id=4f8915a7fe1632abd3786f3c3885067a93b86012-8263641-images-thumbs&n=13',
      name: 'Divergent',
      timeOfTheFilm: '1ч 44м',
      isSave:'+',
    },
    {
      link: 'https://avatars.mds.yandex.net/i?id=3ee45854ebc02036f867157a5352e92734ce0b04-9149598-images-thumbs&n=13',
      name: 'Divergent 2',
      timeOfTheFilm: '2ч 14м',
      isSave: '',
    },
    {
      link: 'https://avatars.mds.yandex.net/i?id=567882a04c2eeeb683fdee69cd46e824cc596cbe-9065836-images-thumbs&n=13',
      name: 'Divergent 3',
      timeOfTheFilm: '30м',
      isSave: '+',
    },
    {
      link: 'https://avatars.mds.yandex.net/i?id=4f8915a7fe1632abd3786f3c3885067a93b86012-8263641-images-thumbs&n=13',
      name: 'Divergent',
      timeOfTheFilm: '1ч 44м',
      isSave:'+',
    },
    {
      link: 'https://avatars.mds.yandex.net/i?id=3ee45854ebc02036f867157a5352e92734ce0b04-9149598-images-thumbs&n=13',
      name: 'Divergent 2',
      timeOfTheFilm: '2ч 14м',
      isSave: '+',
    },
    {
      link: 'https://avatars.mds.yandex.net/i?id=567882a04c2eeeb683fdee69cd46e824cc596cbe-9065836-images-thumbs&n=13',
      name: 'Divergent 3',
      timeOfTheFilm: '30м',
      isSave: '',
    },
    {
      link: 'https://avatars.mds.yandex.net/i?id=4f8915a7fe1632abd3786f3c3885067a93b86012-8263641-images-thumbs&n=13',
      name: 'Divergent',
      timeOfTheFilm: '1ч 44м',
      isSave:'+',
    },
    {
      link: 'https://avatars.mds.yandex.net/i?id=3ee45854ebc02036f867157a5352e92734ce0b04-9149598-images-thumbs&n=13',
      name: 'Divergent 2',
      timeOfTheFilm: '2ч 14м',
      isSave: '+',
    },
    {
      link: 'https://avatars.mds.yandex.net/i?id=567882a04c2eeeb683fdee69cd46e824cc596cbe-9065836-images-thumbs&n=13',
      name: 'Divergent 3',
      timeOfTheFilm: '30м',
      isSave: '',
    }
  ]; // !test

  return (
    <section className='galery' aria-label='секция с фильмами'>
      {movies.map(movie => (
        (location.pathname === '/saved-movies' && movie.isSave === '') || location.pathname !== '/saved-movies' ? (
          <MoviesCard
            key={movie.name}
            link={movie.link}
            name={movie.name}
            timeOfTheFilm={movie.timeOfTheFilm}
            isSave={movie.isSave}
          />
        ) : null
      ))}
    </section>
  );
}

export default MoviesCardList;