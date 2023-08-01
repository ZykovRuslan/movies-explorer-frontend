import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../CurrentUserContext/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <CurrentUserContext.Provider>
      <div className='app'>
        <Routes>
          <Route exact path='/' element={<Main isLoggedIn={isLoggedIn} />} />
          <Route exact path='/movies' element={<Movies isLoggedIn={isLoggedIn} />} />
          <Route exact path='/saved-movies' element={<SavedMovies isLoggedIn={isLoggedIn} />} />
          <Route exact path='/profile' element={<Profile isLoggedIn={isLoggedIn} />} />
          <Route exact path='/signup' element={<Register />}
          />
          {/* <Route path='sign-in' element={<Login onAuth={heandleLogin} isLoggedIn={isLoggedIn} />} /> */}
          <Route path='*' element={isLoggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />} />
        </Routes>
    </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
