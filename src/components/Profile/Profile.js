import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

function Profile(isLoggedIn) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn}/>
      <section className='profile'>
        <div className='profile__container'>
          <h2 className='profile__name'>Привет, Руслан!</h2>
          <form className='profile__form'>
            <label className='profile__label-name'>Имя
              <input className='profile__input' name='name' type='text' placeholder='Имя' required />
            </label>
            <label className='profile__label-email'>E-mail
              <input className='profile__input' name='email' type='email' placeholder='E-mail' required />
            </label>
            <div className='profile__align'>
              <button className='profile__btn-edit' type='submit'>Редактировать</button>
              <button className='profile__btn-exit'>Выйти из аккаунта</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;