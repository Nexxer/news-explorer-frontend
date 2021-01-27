import './App.css';
import '../../index.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import PopupReg from '../PopupReg/PopupReg';
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import SavedNewsPage from '../SavedNewsPage/SavedNewsPage';
import React, { useCallback, useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getArticlesFromNewsApi } from './../../utils/NewsApi';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { registration, onLogin, getUserDataFromDataBase, getSavedNewsFromDataBase, addArticleToSavedNews, deleteArticleToSavedNews } from '../../utils/apiLogin'

function App() {
  const [isResult, setResult] = useState(false);
  const [isPreloader, setPreloader] = useState(false);
  const [isNotFound, setNotFound] = useState(false);
  const [isPopupWithForm, setPopupWithForm] = useState(false);
  const [isPopupReg, setPopupReg] = useState(false);
  const [isMenu, setMenu] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [foundNewsCards, setFoundNewsCards] = useState([]);
  const [isSearchFetchFail, setIsSearchFetchFail] = useState(false);
  const [savedNewsCards, setSavedNewsCards] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    const userDataFromStorage = JSON.parse(localStorage.getItem('user'))
    const savedNewsFromStorage = JSON.parse(localStorage.getItem('savedNews'));
    const foundNewsFromStorage = JSON.parse(localStorage.getItem('foundNews'));
    if (jwt) {
      setLogin(true);
      setCurrentUser(userDataFromStorage);
      setSavedNewsCards(savedNewsFromStorage);
    }
    if (foundNewsFromStorage) {
      setFoundNewsCards(foundNewsFromStorage);
      setResult(true)
    } else if (history.location.state) {
      setPopupWithForm(true);
    }
  }, [history]);

  const getFormattedDate = (data) => {
    const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];

    const monthNumber = new Date(data).getMonth();
    const letterMonth = months[monthNumber];
    const numericDay = new Date(data).getDate();
    const numericYear = new Date(data).getFullYear();
    return `${numericDay} ${letterMonth}, ${numericYear}`;
  };


  const togglePreloader = useCallback(() => {
    setPreloader(!isPreloader);
  }, [isPreloader]);

  const toggleNotFound = useCallback(() => {
    setNotFound(!isNotFound);
  }, [isNotFound]);

  function handleReg(email, password, name) {
    setIsProcessing(true)
    registration(email, password, name)
      .then((res) => {
        if (res.email === email) {
          setPopupWithForm(false);
          setPopupReg(true);
          history.push('/')
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => { setIsProcessing(false) })
  };

  const handleLogin = useCallback(
    ({ email, password }, showError) => {
      setIsProcessing(true)
      onLogin(email, password)
        .then((res) => {
          if (res.token) {
            setResult(false);
            localStorage.removeItem('foundNews');
            localStorage.setItem("jwt", res.token);
            setPopupWithForm(false);
            Promise.all([getUserDataFromDataBase(), getSavedNewsFromDataBase()])
              .then(([userData, savedNews]) => {
                if (userData.message) {
                  showError(userData.message);
                } else if (savedNews.message) {
                  showError(savedNews.message);
                } else {
                  setCurrentUser(userData);
                  setUserDataToStorage(userData);
                  setSavedNewsToStorage(savedNews);
                  setSavedNewsCards(savedNews);
                  setLogin(true);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            if (res.statusCode) {
              res.message = 'Переданы некорректные данные';
            }
            showError(res.message);
          }
        })
        .catch((err) => {
          console.log({ err });
        })
        .finally(() => { setIsProcessing(false) })
    }, [])

  function handleLogout() {
    setResult(false);
    setMenu(false);
    setLogin(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('foundNews');
    localStorage.removeItem('savedNews');
    localStorage.removeItem('user');
    history.push('/')
  };

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

  useEffect(() => {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    });
  }, [closeAllPopups]);

  const handleSearchFormSubmit = useCallback(
    (valueToSearch) => {
      setResult(false);
      setPreloader(true);
      setNotFound(false);
      setIsSearchFetchFail(false);

      getArticlesFromNewsApi(valueToSearch)
        .then((res) => {
          if (res.status !== 'ok') {
            setIsSearchFetchFail(true)
            setNotFound(true);
            return setPreloader(false);
          } else if (res.articles.length === 0) {
            setPreloader(false);
            return setNotFound(true);
          }
          const formattedNewsCards = res.articles.map((article) => ({
            source: article.source.name,
            keyword: valueToSearch[0].toUpperCase().concat(valueToSearch.slice(1).toLowerCase()),
            title: article.title,
            text: article.description,
            date: getFormattedDate(article.publishedAt),
            link: article.url,
            image: article.urlToImage,
          }));
          localStorage.setItem('foundNews', JSON.stringify(formattedNewsCards));
          setFoundNewsCards(JSON.parse(localStorage.getItem('foundNews')));
          setPreloader(false);
          setNotFound(false);
          setResult(true);
        })
        .catch((err) => {
          console.log(err);
          setIsSearchFetchFail(true)
          setResult(false);
        })
    }, []);

  const setUserDataToStorage = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
  };

  const setSavedNewsToStorage = (news) => {
    localStorage.setItem('savedNews', JSON.stringify(news));
  };

  const handleSaveArticle = useCallback((article) => {
    addArticleToSavedNews(article)
      .then((newCard) => {
        const savedNewsFromStorage = JSON.parse(localStorage.getItem('savedNews'));
        const resultCardsArray = savedNewsFromStorage.concat(newCard);
        setSavedNewsCards(resultCardsArray);
        setSavedNewsToStorage(resultCardsArray);
      })
      .catch((err) => {
        console.log(err);
      });
  },
    [savedNewsCards],
  );

  const handleDeleteArticle = useCallback((link) => {
    const idDelCard = savedNewsCards.find(i => i.link === link)
    deleteArticleToSavedNews(idDelCard._id)
      .then(() => {
        const savedNewsFromStorage = JSON.parse(localStorage.getItem('savedNews'));
        const arrWithOutDeleteCard = savedNewsFromStorage.filter(card => card.link !== link)
        setSavedNewsCards(arrWithOutDeleteCard)
        setSavedNewsToStorage(arrWithOutDeleteCard);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [savedNewsCards]
  );

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>

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
              handleSearchFormSubmit={handleSearchFormSubmit}
            />
          </div>
          <Main
            areResultsShown={isResult}
            isPreloaderShown={isPreloader}
            showAndHideNotFound={toggleNotFound}
            showAndHidePreloader={togglePreloader}
            isNotFoundShown={isNotFound}
            isLogin={isLogin}
            makelogin={togglelogin}
            resultFromSearch={foundNewsCards}
            searchFailed={isSearchFetchFail}
            saveCard={handleSaveArticle}
            saveCardArr={savedNewsCards}
            delCard={handleDeleteArticle}
          />
        </Route>

        <ProtectedRoute
          path={'/saved-news'}
          loggedIn={isLogin}
          component={SavedNewsPage}
          onMenuClick={toggleMenu}
          isMenuShown={isMenu}
          isLogin={isLogin}
          isFontDark={true}
          onAuthClick={handleOpenAuth}
          makelogin={togglelogin}
          onLogoutClick={handleLogout}
          showAndHideNotFound={toggleNotFound}
          isUserlogin={true}
          savedNews={savedNewsCards}
          delCard={handleDeleteArticle}
          closeMenuOnclick={closeMenu}
        />

        <Route path="*">
          <NotFoundPage />
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
          reqProcess={isProcessing}
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
    </CurrentUserContext.Provider>
  );
}

export default App;