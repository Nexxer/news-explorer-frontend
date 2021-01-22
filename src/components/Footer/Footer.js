import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';
import fbIcon from '../../images/facebook-circular-logo.svg';
import gitIcon from '../../images/github.svg';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer_copyright">© 2021 Supersite, Powered by News API</p>
      <nav className="footer-nav-links">
        <ul className="footer__links">
          <li className="footer__link_text">
            <NavLink className="footer-nav-link" to='/'>Главная</NavLink>
            <a className="footer-nav-link" href='https://praktikum.yandex.ru'>Яндекс.Практикум</a>
          </li>
          <li className="footer__link">
            <a href='https://github.com/Nexxer'>
              <img className="footer__icon" src={gitIcon} alt="github" />
            </a>
            <a href='https://www.facebook.com/nekker.nike'>
              <img className="footer__icon" src={fbIcon} alt="facebook" />
            </a>
          </li>
        </ul>
      </nav>
    </footer >
  );
}

export default Footer;