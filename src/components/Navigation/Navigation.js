import React, { useState } from 'react';
import './Navigation.css';
import logo from '../../images/logo.svg';
import { Link, NavLink } from 'react-router-dom';
import openMenu from '../../images/navigation__btn-burger.svg';
import closeMenu from '../../images/navigation__btn-burger-close.svg';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='navigation'>
      <div className='navigation__container'>
        <Link to='/'>
          <img src={logo} className='navigation__logo' alt='логотип' />
        </Link>
        <div className={`navigation__menu ${isMenuOpen ? 'navigation__menu_open' : ''}`}>
          <div className='navigation__align'>
            {isMenuOpen && <NavLink to='/' className={({isActive}) => isActive ? "navigation__active" : "navigation__link" }>
              Главная
            </NavLink> }
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
        <button className={`navigation__burger ${isMenuOpen ? 'navigation__burger_open' : ''}`} aria-label='меню' onClick={toggleMenu} type='button'>
          {isMenuOpen ? <img className='navigation__btn-burger-close' alt='закрыть меню' src={closeMenu} /> : 
          <img className="navigation__btn-burger" alt='открыть меню' src={openMenu} />}
        </button>
        <div className={`navigation__overlay ${isMenuOpen ? 'navigation__overlay_open' : ''}`} onClick={toggleMenu}></div>
      </div>
    </nav>
  );
}

export default Navigation;