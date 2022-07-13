import api from "./api";

class Auth {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  signUp({ email, password }) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(api.checkResponse);
  }

  signIn({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(api.checkResponse);
  }

  checkAuth(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).then(api.checkResponse);
  }
}

const auth = new Auth({
  url: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
