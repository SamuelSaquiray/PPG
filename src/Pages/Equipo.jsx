import MemberCard from "../components/MemberCard";
import Header from "../components/Header";
import "./Equipo.css"
function Equipo() {
  return (
    <>
    <Header/>
    <div className="members-team">
      <MemberCard title="Samuel Saquiray" description="Lorem ipsum" />
      <MemberCard title="Ucha" description="Lorem" />
    </div>
    </>
  );
}

export default Equipo;
