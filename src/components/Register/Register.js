import React, { useState, useEffect } from 'react';
import './Register.css';
import logo from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';

function Register({ onRegister, serverError, isLoggedIn }) {
  const [formData, setFormData] = useState({name: '', email: '', password: ''});
  const [formErrors, setFormErrors] = useState({name: '', email: '', password: ''});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const isFormValid = () => {
    return (
      Object.values(formData).every(value => value !== '') && 
      Object.values(formErrors).every(error => error === '') &&
      !isSubmitting
    );
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let errorMessage = '';

    switch (fieldName) {
      case 'name':
        if (value.length < 2) {
          errorMessage = 'Имя должно содержать не менее двух символов';
        } else if (!validator.matches(value, /^[A-Za-zА-Яа-яЁё\s-]{2,30}$/)) {
          errorMessage = 'Имя должно содержать только латиницу, кириллицу, пробел или дефис';
        }
        break;
      case 'email':
        if (value.length < 6) {
          errorMessage = 'Email должен содержать от 6 до 30 символов';
        } else if (!validator.isEmail(value)) {
          errorMessage = 'Введите корректный email';
        }
        break;
      case 'password':
        if (!validator.isLength(value, { min: 6, max: 40 })) {
          errorMessage = 'Пароль должен содержать от 6 до 40 символов';
        }
        break;
      default:
        break;
    }

    setFormErrors({
      ...formErrors,
      [fieldName]: errorMessage,
    });
  };

    useEffect(() => {
    if (isLoggedIn) {
      navigate('/movies');
    }
  }, [isLoggedIn, navigate]);

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (isFormValid() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onRegister(formData.name, formData.email, formData.password);
      } catch (err) {
        console.log(err);
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <>
      <section className='register'>
        <Link to="/">
          <img src={logo} alt="Логотип" className="register__logo" />
        </Link>
        <main className='register__content'>
          <h1 className='register__greeting'>Добро пожаловать!</h1>
          <form className='register__form' onSubmit={handleSubmit}>
            <label className='register__label'>Имя
              <input 
                className='register__input' 
                name='name' 
                type='text' 
                placeholder='Имя' 
                minLength='2' 
                maxLength='30' 
                autoComplete="off" 
                required 
                value={formData.name}
                onChange={handleInputChange}
              />
              <span className={`${formErrors.name ? 'register__input-error' : ''}`}>{formErrors.name}</span>
            </label>
            <label className='register__label'>E-mail
              <input 
                className='register__input' 
                name='email' 
                type='email' 
                placeholder='E-mail' 
                minLength='6' 
                maxLength='40' 
                autoComplete="off" 
                required 
                value={formData.email}
                onChange={handleInputChange}
              />
              <span className={`${formErrors.email ? 'register__input-error' : ''}`}>{formErrors.email}</span>
            </label>
            <label className='register__label'>Пароль
              <input 
                className='register__input' 
                name='password' 
                type='password' 
                placeholder='Пароль' 
                minLength='6' 
                maxLength='40' 
                autoComplete='new-password'
                required 
                value={formData.password}
                onChange={handleInputChange}
              />
              <span className={`${formErrors.password ? 'register__input-error' : ''}`}>{formErrors.password}</span>
            </label>
            {serverError && <p className='register__error-message'>{serverError}</p>}
            <button  
              className={`register__btn ${!isFormValid() ? 'register__btn_disabled' : ''}`} 
              type='submit' 
              disabled={!isFormValid()}
            >
              Зарегистрироваться
            </button>
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
