import Linkedin from "../svg/Linkedin";
import Insta from "../svg/Insta"
import "./Header.css"; // Importa los estilos específicos de Header
import { Link } from "react-router-dom";


function Header() {
  return (
    <>
      <header className="header-container">
        {/* Navegación principal */}
        <nav className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/Historial">Historial</Link>
          <Link to="/ppg">Anomalías</Link>
          <Link to="/Equipo">Equipo</Link>
          <Link to="">Unirte</Link>
        </nav>

        {/* Navegación social */}
        <nav className="social-links">
          <a href="https://www.instagram.com/s_saquiray22">
            <Insta/>
          </a>
          <a href="https://www.instagram.com/s_saquiray22">
            <Linkedin className="social-icon" />
          </a>
        </nav>
      </header>
    </>
  );
}

export default Header;
