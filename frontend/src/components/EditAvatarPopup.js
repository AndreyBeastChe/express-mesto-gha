import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatar = React.useRef();

  function HandleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(avatar.current.value);
    avatar.current.value = "";
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={HandleSubmit}
      title="Обновить аватар"
      name="user"
      onClose={onClose}
    >
      <div className="popup__field">
        <input
          required
          type="url"
          className="popup__input popup__input_type_link"
          name="avatarInput"
          placeholder="Ссылка на аватар"
          id="avatar"
          ref={avatar}
        />
        <span id="avatar-error" className="popup__error" />
      </div>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
