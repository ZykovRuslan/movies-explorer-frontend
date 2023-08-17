import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../CurrentUserContext/CurrentUserContext';
import './Profile.css';
import Header from '../Header/Header';
import validator from 'validator';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [originalName, setOriginalName] = useState(currentUser.name || '');
  const [originalEmail, setOriginalEmail] = useState(currentUser.email || '');
  const [hasChanges, setHasChanges] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formErrors, setFormErrors] = useState({name: '', email: ''});

  const isFormValid = () => {
    return (
      formErrors.name === '' && formErrors.email === ''
    );
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    }

    validateField(name, value);
    setHasChanges((name === 'name' && value !== originalName) || (name === 'email' && value !== originalEmail));
  };

  const handleUpdateClick = async (evt) => {
    evt.preventDefault();
    if (hasChanges && isFormValid() && !isSubmitting) {
      setIsSubmitting(true); 
      try {
        await props.onUpdateUser({ name, email });
        setOriginalName(name);
        setOriginalEmail(email);
        setHasChanges(false);
        setUpdateSuccess(true);
        
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 3000); 
      } catch (err) {
        console.log(err);
      } finally {
        setIsSubmitting(false);
      }
    }
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
      default:
        break;
    }

    setFormErrors({
      ...formErrors,
      [fieldName]: errorMessage,
    });
  };

  useEffect(() => {
    setName(currentUser.name || '');
    setEmail(currentUser.email || '');
    setOriginalName(currentUser.name || '');
    setOriginalEmail(currentUser.email || '');
  }, [currentUser]);

  return (
    <>
      <Header isLoggedIn={props.isLoggedIn}/>
      <main className='profile'>
        <section className='profile__container'>
          <h1 className='profile__name'>Привет, {currentUser.name || 'пользователь'}!</h1>
          <form className='profile__form'>
            <label className='profile__label-name'>Имя
              <input 
                className='profile__input' 
                name='name' 
                type='text' 
                placeholder='Имя' 
                required 
                value={name}
                onChange={handleInputChange}
              />
              <p className={`${formErrors.name ? 'profile__input-error' : ''}`}>{formErrors.name}</p>
            </label>
            <label className='profile__label-email'>E-mail
              <input 
                className='profile__input' 
                name='email' 
                type='email' 
                placeholder='E-mail' 
                required 
                value={email}
                onChange={handleInputChange}
              />
              <p className={`${formErrors.email ? 'profile__input-error' : ''}`}>{formErrors.email}</p>
            </label>
            <div className='profile__align'>
              {props.error && <p className='profile__error-message'>{props.error}</p>}
              {updateSuccess && !props.error && (
                <p className='profile__update-success'>Данные успешно обновлены!</p>
              )}
              <button 
                className={`profile__btn-edit ${!hasChanges || !isFormValid() ? 'profile__btn-edit_disabled' : ''}`} 
                type='button' 
                onClick={handleUpdateClick}
                disabled={!hasChanges || !isFormValid()}
              >
                Редактировать
              </button>
              <Link to="/" className='profile__btn-exit' onClick={props.onSignOut}>Выйти из аккаунта</Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;