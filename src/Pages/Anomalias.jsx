import PPGChart from '../components/PPGChart';
import Header from '../components/Header';
import './Anomalias.css';





const patientData = {
  /*
  
  */
  name: "Juan Pérez",
  age: 45,
  lastUpdated: "2025-01-20",
  diagnosis: "Sin indicios de arritmias detectados",
};

function PPg() {
  return (
    <>
      <div className='ppg-analysis'>
        <Header/>
        
        <div className="ppg-container">
          <div className="ppg-content">

            <div className="ppg-card ppg-patient-info">
              <h2 className="ppg-subtitle">
                Información del Paciente
              </h2>
              <ul className="ppg-patient-details">
                <li>
                  <strong>Nombre:</strong> {patientData.name}
                </li>
                <li>
                  <strong>Edad:</strong> {patientData.age} años
                </li>
                <li>
                  <strong>Última actualización:</strong> {patientData.lastUpdated}
                </li>
                <li>
                  <strong>Diagnóstico:</strong> {patientData.diagnosis}
                </li>
              </ul>
            </div>

            <div className="ppg-card ppg-chart-section">
              <div className="ppg-chart-container">
                <PPGChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PPg;
