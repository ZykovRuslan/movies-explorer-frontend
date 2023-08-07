import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header({ isLoggedIn }) {
  const location = useLocation();

  return (
    <header className='header'>
      {isLoggedIn && <Navigation />}

      {!isLoggedIn && location.pathname !== '/signup' && location.pathname !== '/signin' && (
        <div className="header__container">
          <Link to="/">
            <img src={logo} alt="Логотип" className="header__logo" />
          </Link>
          <nav className="header__align">
            <Link to="/signup" className="header__btn-register">
              Регистрация
            </Link>
            <Link to="/signin" className="header__btn-auth">
              Войти
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header;
