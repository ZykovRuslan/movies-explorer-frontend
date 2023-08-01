import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__align'>
      <p className="footer__copyright">&#169; {new Date().getFullYear()}</p>
      <ul className="footer__list">
        <li className="footer__item">
          <a className="footer__link" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
        </li>
        <li className="footer__item">
          <a className="footer__link" href="https://github.com/ZykovRuslan">Github</a>
        </li>
      </ul>
      </div>
    </footer>
  );
}

export default Footer;