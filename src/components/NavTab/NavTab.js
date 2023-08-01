import './NavTab.css';

function NavTab() {
  return (
    <nav className='nav-tab' aria-label="Навигация страницы">
      <ul className="nav-tab__list">
        <li><a className="nav-tab__link" href="#about-project">О проекте</a></li>
        <li><a className="nav-tab__link" href="#technologies">Технологии</a></li>
        <li><a className="nav-tab__link" href="#student">Студент</a></li>
      </ul>
    </nav>
  );
};
  
export default NavTab;