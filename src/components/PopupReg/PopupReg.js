import './PopupReg.css';

function PopupReg(props) {

  return (
    <div className={`popup ${props.isOpen && `popup_opened`}`} onClick={props.onOverlayAndEscClick} >
      <div className="popup__container" >
        <button type="button" className="popup__btn-close" onClick={props.onClose}/>
        <h2 className="popup__title">Пользователь успешно зарегистрирован!</h2>
        <button className="popup__reg-btn" type="button" onClick={props.onLogin}>Войти</button>
      </div>
    </div>
  );
}

export default PopupReg;