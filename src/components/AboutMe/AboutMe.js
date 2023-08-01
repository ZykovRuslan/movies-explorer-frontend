import React from 'react';
import './AboutMe.css';
import myPhoto from '../../images/my-photo.jpg';

function AboutMe() {
  return (
    <article className='about-me' id='student'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__info'>
        <div className='about-me__align'>
          <h3 className='about-me__name'>Руслан</h3>
          <p className='about-me__subtitle'>Фронтенд-разработчик, 33 года</p>
          <p className='about-me__text'>Я родился в Германии, провел детство в Курске и по настоящее время проживаю в Ижевске.
          Закончил ИжГТУ по специальности "Конструкторско-технологиеческое обеспечение машиностроительных производств".
          Занимаюсь спортом, люблю активные командные игры. В свободное время решаю аздачи на codewars, постепенно переходя 
          на более высокий уровень.</p>
          <ul className='about-me__contacts'>
            <li className='about-me__contact'>
              <a className='about-me__link' href='https://github.com/ZykovRuslan'>Github</a>
            </li>
          </ul>
        </div>
        <img className='about-me__photo' src={myPhoto} alt='Фото студента' />
      </div>
    </article>
  );
}

export default AboutMe;