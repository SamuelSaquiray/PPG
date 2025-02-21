import MemberCard from "../components/MemberCard";
import Header from "../components/Header";
import "./Equipo.css"
function Equipo() {
  return (
    <>
    <Header/>
    <div className="blue">
      <h1>Nuestro equipo de trabajo</h1>
    </div>
    <div className="members-team">
    <MemberCard title="Samuel Saquiray" imagen="public/Perfil/Saquiray.png"
      description="Estudiante de quinto ciclo de la carrera de ciencias de la computacion"
      cargo="CTO" />
       <MemberCard title="Diego Uchasara" imagen="public/Perfil/Uchasara.jpg"
      description="Estudiante de septimo ciclo de la carrera de ingenieria electronica"
      cargo="CIO" />
       <MemberCard title="Berdugo" imagen="public/Perfil/Berde.jpg"
      description="Estudiante de ... No se pero es berdugo"
      cargo="Hierro 4" />

    </div>
    </>
  );
}

export default Equipo;
