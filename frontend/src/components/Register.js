import React from "react";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister({ email, password });
  }

  function handleChange(e) {
    const value = e.target.value;
    const name =
      e.target.name === "email" ? setEmail(value) : setPassword(value);
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h3 className="login__title">Регистрация</h3>
        <div className="login__field">
          <input
            required
            type="email"
            className="login__input"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="login__field">
          <input
            required
            type="password"
            className="login__input"
            name="password"
            id="password"
            placeholder="Пароль"
            onChange={handleChange}
          />
        </div>
        <button className="login__button" type="submit">
          Зарегистрироваться
        </button>
        <p className="login__toLogin">
          <Link className="login__link" to="/signin">
            Уже зарегистрированы? Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
