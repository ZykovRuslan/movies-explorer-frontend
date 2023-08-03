import React from "react";
import "./PageError404.css";
import { Link } from 'react-router-dom';

function PageError404() {
  return(
    <section className="page-error">
      <h2 className="page-error__title">404</h2>
      <p className="page-error__text">Страница не найдена</p>
      <Link to="/" className="page-error__btn">
        Назад
      </Link>
    </section>
  );
}

export default PageError404;