import ok from "../images/ok.svg";
import error from "../images/error.svg";

const okText = "Вы успешно зарегистрировались!";
const errorText = "Что-то пошло не так! Попробуйте ещё раз";

function InfoTooltip({ isOpen, onClose, state }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <form className="popup__content" noValidate="">
          <div>
            <img
              className="popup__icon"
              src={state ? ok : error}
              alt={state ? okText : errorText}
            />
            <p className="popup__message">{state ? okText : errorText}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InfoTooltip;
