import './App.css';
import '../../index.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import PopupReg from '../PopupReg/PopupReg';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import React, { useCallback, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

function App() {


  const [result, setResult] = useState(false);
  const [isPreloader, setPreloader] = useState(false);
  const [isNotFound, setNotFound] = useState(false);
  const [isPopupWithForm, setPopupWithForm] = useState(false);
  const [isPopupReg, setPopupReg] = useState(false);
  const [isMenu, setMenu] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const history = useHistory();

  const showResut = useCallback(() => {
    setResult(!result);
  }, [result]);

  const togglePreloader = useCallback(() => {
    setPreloader(!isPreloader);
  }, [isPreloader]);

  const toggleNotFound = useCallback(() => {
    setNotFound(!isNotFound);
  }, [isNotFound]);

  const handleReg = useCallback(() => {
    setPopupWithForm(false);
    setPopupReg(true);
  }, []);

  const handleLogin = useCallback(() => {
    setPopupWithForm(false);
  }, []);

  const handleOpenAuth = useCallback(() => {
    setPopupWithForm(true);
  }, []);

  const handleLoginClick = useCallback(() => {
    setPopupReg(false);
    setPopupWithForm(true);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenu(!isMenu);
  }, [isMenu]);

  const closeMenu = useCallback(() => {
    setMenu(false);
  }, []);

  const togglelogin = useCallback(() => {
    setLogin(!isLogin);
  }, [isLogin]);


  const closeAllPopups = useCallback(() => {
    setPopupWithForm(false);
    setPopupReg(false)
  }, []);

  const handleOverlayClose = useCallback((e) => {
    if (e.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }, [closeAllPopups]);

  React.useEffect(() => {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    });
  }, [closeAllPopups]);

  const handleLogout = useCallback(() => {
    setResult(false);
    setMenu(false);
    setLogin(false);
    history.push('/');
  }, [history]);

  return (
    <>
      <Switch>

        <Route path={'/saved-news'}>
          <div className="page__header_saved-news">
            <Header
              onMenuClick={toggleMenu}
              isMenuShown={isMenu}
              isLogin={isLogin}
              isFontDark={true}
              onAuthClick={handleOpenAuth}
              makelogin={togglelogin}
              onLogoutClick={handleLogout}
            />
            <SavedNewsHeader />
          </div>
          <SavedNews
            showAndHideNotFound={toggleNotFound}
            isUserlogin={true}
          />
        </Route>

        <Route exact path={'/'}>
          <div className="page__header">
            <Header
              onMenuClick={toggleMenu}
              isMenuShown={isMenu}
              isLogin={isLogin}
              isFontDark={false}
              onAuthClick={handleOpenAuth}
              closeMenuOnclick={closeMenu}
              makelogin={togglelogin}
              onLogoutClick={handleLogout}
            />
            <SearchForm
              onSearch={showResut}
            />
          </div>
          <Main
            areResultsShown={result}
            isPreloaderShown={isPreloader}
            showAndHideNotFound={toggleNotFound}
            showAndHidePreloader={togglePreloader}
            isNotFoundShown={isNotFound}
            isUserlogin={isLogin}
            makelogin={togglelogin}
          />
        </Route>

      </Switch>
      <Footer />

      {
        isPopupWithForm &&
        <PopupWithForm
          isOpen={isPopupWithForm}
          onClose={closeAllPopups}
          onRegister={handleReg}
          onLogin={handleLogin}
          onOverlayAndEscClick={handleOverlayClose}
        />
      }
      {
        isPopupReg &&
        <PopupReg
          isOpen={isPopupReg}
          onClose={closeAllPopups}
          onLogin={handleLoginClick}
          onOverlayAndEscClick={handleOverlayClose}
        />
      }
    </>
  );
}

export default App;