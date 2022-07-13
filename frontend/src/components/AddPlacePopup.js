import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: place,
      link: link,
    });
    setPlace("")
    setLink("")
  }

  function handleChange(e) {
    const value = e.target.value;
    const name =
      e.target.name === "placeInput" ? setPlace(value) : setLink(value);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Новое место"
      name="new-card"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          required
          minLength={2}
          maxLength={30}
          type="text"
          className="popup__input popup__input_type_place"
          name="placeInput"
          placeholder="Название"
          id="new-place"
          value = {place}
          onChange={handleChange}
        />
        <span id="new-place-error" className="popup__error" />
      </div>
      <div className="popup__field">
        <input
          required
          type="url"
          className="popup__input popup__input_type_link"
          name="linkInput"
          placeholder="Ссылка на картинку"
          id="link"
          value = {link}
          onChange={handleChange}
        />
        <span id="link-error" className="popup__error" />
      </div>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
