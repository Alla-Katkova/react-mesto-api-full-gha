import { useLocation} from 'react-router-dom';



export default function Footer() {
  const path = useLocation().pathname
  return (
    <footer className="footer">
      {/* <p className="footer__copyright">© 2023 Mesto Russia</p> */}
      {
        path !== "/" ? <p className="header__button"></p> : <p className="footer__copyright">© 2023 Mesto Russia</p>
      }
    </footer>
  )
}