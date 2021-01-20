import React, { useCallback } from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import exitIcon from '../../images/LogoutLight.svg';
import exitIconDark from '../../images/LogoutDark.svg';
import { useLocation } from "react-router-dom";

function Navigation(props) {
  const location = useLocation();
  const handleAuthClick = useCallback(() => {
    props.closeMenuOnclick();
    props.onAuthClick();
  }, [props]);

  return (
    <nav className={props.isMenuShown ? "nav-list nav-list_vertical" : "nav-list"}>
      <NavLink className={!props.isFontDark && !(location.pathname === '/') ? "nav-list__item nav-list__item_light" : "nav-list__item"}
        exact to={'/'}
        activeClassName="nav-list__item_active"
        onClick={props.onMenuClick}>Главная</NavLink>
      {
        props.isLogin && <NavLink className={!props.isFontDark && !(location.pathname === '/saved-news') ? "nav-list__item nav-list__item_light" : "nav-list__item"}
          activeClassName="nav-list__item_active"
          exact to={'/saved-news'}
          onClick={props.onMenuClick}>Сохранённые статьи</NavLink>
      }
      {
        props.isUserlogin ?
          <button className={props.isFontDark ? "nav-list__btn nav-list__btn_dark" : "nav-list__btn"} onClick={props.onMenuClick}>
            Грета
                        <img className="nav-list__exit" src={props.isFontDark && !props.isMenuShown ? exitIconDark : exitIcon} alt="выйти" />
          </button>
          :
          <button className="nav-list__btn" onClick={handleAuthClick}>Авторизоваться</button>
      }
    </nav>
  );
}

export default Navigation;