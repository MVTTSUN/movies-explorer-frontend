import { Link } from 'react-router-dom';
import './Logo.css';
import logo from '../../images/logo.svg';

export default function Logo() {
  return (
    <Link className="logo link" to="/">
      <img src={logo} alt="Логотип" />
    </Link>
  );
}
