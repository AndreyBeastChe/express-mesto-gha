class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._groupId = "cohort-33";
  }

  checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._url}/${this._groupId}/users/me`, {
      headers: this._headers,
    }).then(this.checkResponse);
  }

  setUser({ name, about }) {
    return fetch(`${this._url}/${this._groupId}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this.checkResponse);
  }

  gerCards() {
    return fetch(`${this._url}/${this._groupId}/cards`, {
      headers: this._headers,
    }).then(this.checkResponse);
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/${this._groupId}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this.checkResponse);
  }

  changeAvatar(avatar) {
    return fetch(`${this._url}/${this._groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this.checkResponse);
  }

  likeCard(cardId, isLiked) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this.checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/v1/${this._groupId}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.checkResponse);
  }
}

const api = new Api({
  url: "http://localhost:3000/",
  headers: {
    authorization: "3671189f-65d1-4347-8209-095bdf48fd3f",
    "Content-Type": "application/json",
  },
});

export default api;