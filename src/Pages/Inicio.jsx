import Header from "../components/Header";
import Badge from "../components/Badge";
import "./Inicio.css"; // Importa el archivo CSS


function Inicio() {
    return (  
      <>
          <Header/>
          <div className="content-container">
              <div className="text-container">
                <h1 className="welcome-title">Bienvenido a PPHeart!</h1>
                <h2 className="welcome-subtitle">
                Bienvenido a PPHeart, tu herramienta para el monitoreo cardíaco avanzado. Nuestro sistema utiliza tecnología de fotopletismografía (PPG) para ayudarte a detectar posibles irregularidades en tu ritmo cardíaco de manera fácil y en tiempo real. Conecta tus dispositivos, lleva un seguimiento detallado de tu salud y comparte los resultados con tu médico de confianza. Juntos, cuidemos de tu corazón.
                </h2>
                <Badge/>
              </div>
              <div>
                
              </div>
              <img src="/cardio_grafic.svg" alt="Ppg" style={{opacity:"60%" , width: '500px', height: '500px'}} />
          </div>       
      </>
    );
  }
  
  export default Inicio;
  