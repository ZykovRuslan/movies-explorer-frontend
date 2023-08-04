import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';

function Profile(isLoggedIn) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <main className='profile'>
        <div className='profile__container'>
          <h1 className='profile__name'>Привет, Руслан!</h1>
          <form className='profile__form'>
            <label className='profile__label-name'>Имя
              <input className='profile__input' name='name' type='text' placeholder='Имя' required />
            </label>
            <label className='profile__label-email'>E-mail
              <input className='profile__input' name='email' type='email' placeholder='E-mail' required />
            </label>
            <div className='profile__align'>
              <button className='profile__btn-edit' type='submit'>Редактировать</button>
              <Link to="/" className='profile__btn-exit' >Выйти из аккаунта</Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Profile;