import { Route, Switch, Link, BrowserRouter } from "react-router-dom";
import logo from "../images/Vector.svg";

function Header({ signOut, email }) {
  return (
    <header className="header">
      <img src={logo} alt={"Лого"} className="header__logo" />
      <div className="header__menu">
        <Switch>
          <Route exact path="/">
            <p className="header__user">{email}</p>
            <button className="header__logout" onClick={signOut}>
              Выйти
            </button>
          </Route>
          <Route path="/signup">
            <Link className="header__auth" to="signin">
              Войти
            </Link>
          </Route>
          <Route path="/signin">
            <Link className="header__auth" to="signup">
              Регистрация
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
