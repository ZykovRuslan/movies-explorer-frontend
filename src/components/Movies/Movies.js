import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({ isLoggedIn }) {
  return (
    <>
    	<Header isLoggedIn={isLoggedIn}/>
      <main className='movies'>
			  <SearchForm />
        <MoviesCardList />
        <button className="movies__btn-follow">Еще</button>
      </main>
      <Footer />
    </>
  );
}

export default Movies;