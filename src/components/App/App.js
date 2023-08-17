import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../CurrentUserContext/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login'
import PageError404 from '../PageError404/PageError404';
import { mainApi, mainApiAuth } from '../../utils';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [serverError, setServerError] = useState('');
  const [error, setError] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return;
    mainApi
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }, [isLoggedIn]);

  async function handleUpdateUser(data) {
    try {
      const res = await mainApi.setUserInfo(data);
      setCurrentUser(res);
    } catch (err) {
      setError('Ошибка при обновлении данных пользователя');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }

  async function handleRegister(name, email, password) {
    try {
      const res = await mainApiAuth.signup({ name, email, password });
      if (res.status === 'error') {
        throw new Error(res.message);
      } else {
        setCurrentUser({ name });
        handleLogin(email, password);
      }
    } catch (error) {
      setServerError('Произошла ошибка при регистрации.');
      setTimeout(() => {
        setServerError('');
      }, 3000);
    }
  }

  async function handleLogin(email, password) {
    try {
      const res = await mainApiAuth.signin({ email, password });
      localStorage.setItem('JWT', res.jwt);
      setIsLoggedIn(true);
      navigate('/movies');
    } catch (error) {
      setServerError('Произошла ошибка при авторизации.');
      setTimeout(() => {
        setServerError('');
      }, 3000);
    }
  }
  
  useEffect(() => {
    async function checkAuth() {
      if (!localStorage.getItem('JWT')) return;
      try {
        const res = await mainApiAuth.checkToken(localStorage.getItem('JWT'));
        if (res) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        setIsLoggedIn(false);
        console.log(err);
      }
    }
    checkAuth();
  }, [isLoggedIn]);

  function onSignOut() {
    localStorage.removeItem('JWT');
    localStorage.removeItem('searchText');
    localStorage.removeItem('shortFilmChecked');
    localStorage.removeItem('filteredMoviesData'); 
    setIsLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>
          <Route
            path='/movies'
            element={
              <ProtectedRoute
                element={Movies}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                element={Profile}
                onSignOut={onSignOut} 
                isLoggedIn={isLoggedIn} 
                onUpdateUser={handleUpdateUser}
                error={error}
              />
            }
          />
          <Route exact path='/' element={<Main isLoggedIn={isLoggedIn} />} />
          <Route exact path='/signup' element={<Register onRegister={handleRegister} serverError={serverError} isLoggedIn={isLoggedIn} />} />
          <Route exact path='/signin' element={<Login onLogin={handleLogin} serverError={serverError} isLoggedIn={isLoggedIn} />} />
          <Route exact path='*' element={<PageError404 />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
