import React from 'react';
import './Navigation.css';
import logo from '../../images/logo.svg';
import { Link, NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className='navigation'>
      <div className='navigation__container'>
        <Link to='/'>
          <img src={logo} className='navigation__logo' alt='логотип' />
        </Link>
        <div className='navigation__align'>
          <NavLink to='/movies' className={({isActive}) => isActive ? "navigation__active" : "navigation__link" }>
            Фильмы
          </NavLink>
          <NavLink to='/saved-movies' className={({isActive}) => isActive ? "navigation__active" : "navigation__link" }>
            Сохранённые фильмы
          </NavLink>
        </div>
        <Link to='/profile' className='navigation__btn-accaunt'>
          Аккаунт
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
