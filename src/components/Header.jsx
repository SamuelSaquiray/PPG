import "./Header.css"; // Importa los estilos específicos de Header
import { Link } from "react-router-dom";


function Header() {
  const handleClick = () => {
    window.location.href = "/unirse";
  };
  return (
    <>
      <header className="header-container">
        <nav className="social-links">
          <a href="https://www.instagram.com/s_saquiray22">
            <img src="/Logo.svg" alt="Ppg" style={{ width: '50px', height: '54px'}} />
          </a>
        </nav>
      
        {/* Navegación principal */}
        <nav className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/ppg">Control</Link>
          <Link to="/Historial">Historial</Link>
          <Link to="/Equipo">Equipo</Link>
          <button id="Unirse" onClick={handleClick}>Unirte</button>
        </nav>
      </header>
    </>
  );
}

export default Header;
