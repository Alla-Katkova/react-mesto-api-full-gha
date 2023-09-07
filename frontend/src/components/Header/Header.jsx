import logo from '../../images/logo_mesto.svg'
import { useLocation, Link } from 'react-router-dom';


export default function Header({ onSignOut, userEmail}) {

  const path = useLocation().pathname

  return (
    <header className="header">
      <img
        src={logo}
        className="header__logo"
        alt="лого место"
      />

      {
        path === "/sign-in" && <Link className="header__button" to={"/sign-up"}>Регистрация</Link>
      }
      {
        path === "/sign-up" && <Link className="header__button" to={"/sign-in"}>Войти</Link>
      }
      {
        path === "/" && (
          <div>{userEmail}
            <a className="header__button" onClick ={onSignOut}>   Выйти</a>
          </div>

        )
      }

    </header>
  )
}