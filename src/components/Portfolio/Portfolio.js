import React from 'react';
import './Portfolio.css';
import follow from '../../images/follow.svg';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://github.com/ZykovRuslan/how-to-learn' target='_blank' rel='noopener noreferrer'>
            Статичный сайт
            <img className='portfolio__follow' src={follow} alt='Ссылка на статичный сайт'/>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://github.com/ZykovRuslan/russian-travel' target='_blank' rel='noopener noreferrer'>
            Адаптивный сайт
            <img className='portfolio__follow' src={follow} alt='Ссылка на адаптивный сайт'/>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' href='https://github.com/ZykovRuslan/react-mesto-api-full-gha' target='_blank' rel='noopener noreferrer'>
            Одностраничное приложение
            <img className='portfolio__follow' src={follow} alt='Ссылка на одностраничное приложение'/>
          </a>
        </li>
    </ul>
    </section>
  );
}

export default Portfolio;