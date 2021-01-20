import React, { useCallback, useEffect } from 'react';
import './PopupWithForm.css';
import { useFormWithValidation } from './../../utils/Validation'

function PopupWithForm(props) {

  const [isRegister, setIsRegister] = React.useState(false);
  const { values, errors, isFormValid, handleInputChange, resetForm } = useFormWithValidation();
  const { email, password, name } = values;

  useEffect(() => {
    resetForm();
  }, [props.isOpen, isRegister, resetForm]);


  const handleContraryOptionClick = useCallback(() => {
    setIsRegister(!isRegister);
  }, [isRegister]);

  return (
    <div className={`popup ${props.isOpen && `popup_opened`}`} onClick={props.onOverlayAndEscClick}>
      <form className="popup__form" name={isRegister ? 'Регистрация' : 'Вход'} >
        <button type="button" className="popup__btn-close" onClick={props.onClose} />
        <h2 className="popup__title">{isRegister ? 'Регистрация' : 'Вход'}</h2>
        <label className="popup__input-title">Email
          <input
            className="popup__input"
            value={email || ''}
            onChange={handleInputChange}
            type="email"
            name="email"
            placeholder="Введите почту"
            inputMode="email"
          />
          <span className="popup__error">{errors.email || ''}</span>
        </label>

        <label className="popup__input-title">
          Пароль
          <input
            className="popup__input"
            value={password || ''}
            onChange={handleInputChange}
            type="password"
            name="password"
            placeholder="Введите пароль"
            inputMode="search"
          />
          <span className="popup__error">{errors.password || ''}</span>
        </label>

        {isRegister &&
          <label className="popup__input-title">
            Имя
            <input
              className="popup__input"
              value={name || ''}
              onChange={handleInputChange}
              type="text"
              name="name"
              placeholder="Введите своё имя"
              inputMode="search"
            />
            <span className="popup__error">{errors.name || ''}</span>
          </label>

        }
        <button
          type="button"
          onClick={isRegister ? props.onRegister : props.onLogin}
          className={isFormValid ? "popup__btn" : "popup__btn popup__btn_inactive"}
          disabled={isFormValid}
        >

          {isRegister ? ' Зарегистрироваться' : 'Войти'}
        </button>
        <p className="contrary">или&nbsp;
         <span
            className="popup__reg-btn"
            type="button"
            onClick={handleContraryOptionClick}
          >
            {isRegister ? 'Войти' : ' Зарегистрироваться'}
          </span>
        </p>
      </form>
    </div>
  );
}

export default PopupWithForm;