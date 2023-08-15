import React, {useState, useEffect} from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';

function Login({ onLogin, serverError, isLoggedIn }) {
  const [formData, setFormData] = useState({email: '', password: ''});
  const [formErrors, setFormErrors] = useState({email: '', password: ''});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const isFormValid = () => {
    return (
      Object.values(formData).every(value => value !== '') && 
      Object.values(formErrors).every(error => error === '')
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

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (isFormValid() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onLogin(formData.email, formData.password);
      } catch (err) {
        console.log(err);
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/movies');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <section className='login'>
        <Link to="/">
          <img src={logo} alt="Логотип" className="login__logo" />
        </Link>
        <main className='login__content'>
          <h1 className='login__greeting'>Рады видеть!</h1>
          <form className='login__form' onSubmit={handleSubmit}>
            <label className='login__label'>E-mail
              <input 
                className='login__input' 
                name='email' 
                type='email' 
                placeholder='E-mail' 
                minLength='2' 
                maxLength='30' 
                autoComplete="off" 
                required
                value={formData.email}
                onChange={handleInputChange}
              />
              <span className={`${formErrors.email ? 'login__input-error' : ''}`}>{formErrors.email}</span>
            </label>
            <label className='login__label'>Пароль
              <input 
                className='login__input' 
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
              <span className={`${formErrors.password ? 'login__input-error' : ''}`}>{formErrors.password}</span>
            </label>
            {serverError && <p className='login__error-message'>{serverError}</p>}
            <button 
              className={`login__btn ${!isFormValid() ? 'login__btn_disabled' : ''}`}
              type='submit' 
              disabled={!isFormValid()}
            >
              Войти
            </button>
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