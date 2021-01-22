import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header(props) {

  return (
    <div className={props.isFontDark ? "header__container header__container_dark" : "header__container"}>
      <header className={props.isMenuShown ? "header header_main" : "header"}>
        <h1 className="header__logo">NewsExplorer</h1>
        <div className={props.isMenuShown ? "header__menu header__menu_popuped" : "header__menu"}>
              <Navigation {...props} />
        </div>
        {props.isMenuShown ?
          <button className="header__close-btn" onClick={props.onMenuClick} />
          :
          <button className={props.isFontDark ? "header_btn header_btn_dark" : "header_btn"} onClick={props.onMenuClick} />
        }
      </header>
    </div>
  );
}

export default Header;