import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleChange(e) {
    const value = e.target.value;
    const name =
      e.target.name === "nameInput" ? setName(value) : setDescription(value);
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      name="edit"
    >
      <div className="popup__field">
        <input
          required
          minLength={2}
          maxLength={40}
          type="text"
          className="popup__input popup__input_type_name"
          name="nameInput"
          id="name"
          value={name}
          onChange={handleChange}
        />
        <span id="name-error" className="popup__error" />
      </div>
      <div className="popup__field">
        <input
          required
          minLength={2}
          maxLength={200}
          type="text"
          className="popup__input popup__input_type_profession"
          name="jobInput"
          id="job"
          value={description}
          onChange={handleChange}
        />
        <span id="job-error" className="popup__error" />
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
