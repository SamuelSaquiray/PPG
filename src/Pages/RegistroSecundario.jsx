import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";


const RegistroSecundario = () => {
    const { userId } = useAuth();
    console.log(userId);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fechaNacimiento: "",
        doc_email: "",
        peso: "",
        contact_emergency: [""],
    });

    const handleChange = (e, index) => {
        if (e.target.name === "contact_emergency") {
            const updatedNumbers = [...formData.contact_emergency];
            updatedNumbers[index] = e.target.value;
            setFormData({ ...formData, contact_emergency: updatedNumbers });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const agregarNumeroEmergencia = () => {
        setFormData({ ...formData, contact_emergency: [...formData.contact_emergency, ""] });
    };

    const eliminarNumeroEmergencia = (index) => {
        const updatedNumbers = formData.contact_emergency.filter((_, i) => i !== index);
        setFormData({ ...formData, contact_emergency: updatedNumbers });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://api-lh8x.onrender.com/completar-perfil/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId, ...formData })
            });

            const data = await response.json();
            if (response.ok) {
                alert("Perfil actualizado correctamente");
                navigate("/");
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error("Error al actualizar perfil:", error);
        }
    };

    return (
        <div>
            <h2>Completa tu Perfil</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Fecha de Nacimiento:
                    <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
                </label>
                
                <label>
                    Correo electronico de su medico:
                    <input type="email" name="doc_email" placeholder="Email" value={formData.doc_email} onChange={handleChange} required />
                    </label>
                

                <label>
                    Peso (kg):
                    <input type="number" name="peso" value={formData.peso} placeholder="peso" onChange={handleChange} required />
                </label>

                <label>Números de Emergencia:</label>
                {formData.contact_emergency.map((numero, index) => (
                    <div key={index}>
                        <input type="tel" name="contact_emergency" value={numero} onChange={(e) => handleChange(e, index)} required />
                        <button type="button" onClick={() => eliminarNumeroEmergencia(index)}>Eliminar</button>
                    </div>
                ))}
                <button type="button" onClick={agregarNumeroEmergencia}>Agregar Número</button>

                <button type="submit" >Guardar</button>
            </form>
        </div>
    );
};

export default RegistroSecundario;
