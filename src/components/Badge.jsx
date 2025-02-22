import "./Badge.css"; // Importa los estilos específicos de Badge

function Badge() {
  const handleClick = () => {
    window.location.href = "/Unirse";
  };

  return (
    <>
      <button className="badge-button" onClick={handleClick}>
        Comencemos
      </button>
    </>
  );
}

export default Badge;
