import React from "react";

import { CurrentUserContext } from "../context/CurrentUserContext";

function Card({ key, card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `place__delete ${
    isOwn ? "place__delete_visible" : "place__delete_hidden"
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `place__like ${
    isLiked && "place__like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="place" key={key}>
      <img
        className="place__foto"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <div className="place__rectangle">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like-place">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="place__like-count">{card.likes.length} </span>
        </div>
      </div>
    </li>
  );
}

export default Card;
