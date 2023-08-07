import React from 'react';
import './Register.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <>
      <section className='register'>
        <Link to="/">
          <img src={logo} alt="Логотип" className="register__logo" />
        </Link>
        <main className='register__content'>
          <h1 className='register__greeting'>Добро пожаловать!</h1>
          <form className='register__form'>
            <label className='register__label'>Имя
              <input className='register__input' name='name' type='text' placeholder='Имя' minLength='6' maxLength='40' autoComplete="off" required />
              <span className="register__input-error"></span>
            </label>
            <label className='register__label'>E-mail
              <input className='register__input' name='email' type='email' placeholder='E-mail' minLength='6' maxLength='40' autoComplete="off" required />
              <span className="register__input-error"></span>
            </label>
            <label className='register__label'>Пароль
              <input className='register__input' name='password' type='password' placeholder='Пароль' minLength='6' maxLength='40' autoComplete="off" required />
              <span className="register__input-error"></span>
            </label>
            <button className='register__btn' type='submit'>Зарегистрироваться</button>
          </form>
          <p className='register__text'>Уже зарегистрированы?{' '}
            <Link className='register__link' to='/signin'>
              <span className="register__signin">Войти</span>
            </Link>
          </p>
        </main>
      </section>
    </>
  );
}

export default Register;