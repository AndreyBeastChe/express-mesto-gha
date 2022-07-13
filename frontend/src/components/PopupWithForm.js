import React from "react";
function PopupWithForm({ title, name, children, isOpen, onClose, onSubmit }) {
  React.useEffect(() => {
    if (!isOpen) return;
  }, [isOpen, onClose]);

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <form
          className="popup__content"
          name={name}
          onSubmit={onSubmit}
          noValidate=""
        >
          <h3 className="popup__title">{title}</h3>
          {children}

          <button type="submit" className="popup__save">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
