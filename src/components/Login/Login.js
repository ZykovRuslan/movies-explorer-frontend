import React from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
      <section className='login'>
        <Link to="/">
          <img src={logo} alt="Логотип" className="login__logo" />
        </Link>
        <main className='login__content'>
          <h1 className='login__greeting'>Рады видеть!</h1>
          <form className='login__form'>
            <label className='login__label'>E-mail
              <input className='login__input' name='email' type='email' placeholder='E-mail' minLength='6' maxLength='40' autoComplete="off" required />
            </label>
            <label className='login__label'>Пароль
              <input className='login__input' name='password' type='password' placeholder='Пароль' minLength='6' maxLength='40' autoComplete="off" required />
            </label>
            <button className='login__btn' type='submit'>Войти</button>
          </form>
          <p className='login__text'>Еще не зарегистрированы?{' '}
            <Link className='login__link' to='/signup'>
              <span className="login__signin">Регистрация</span>
            </Link>
          </p>
        </main>
      </section>
    </>
  );
}

export default Login;