import axios from "axios"

const consultarEstudiante = async (id) => {
    const respuesta = axios.get(`http://localhost:8081/api/matricula/v1/estudiantes/${id}`).then(rpt => rpt.data);
    return respuesta;
}

const consultarTodosEstudiantes = async () => {
    const respuesta = await axios.get("http://localhost:8081/api/matricula/v1/estudiantes").then((rpt) => rpt.data);
    return respuesta;
};

//Funciones fachada
export const consultarEstudianteFachada = async (id) => {
    return await consultarEstudiante(id);
}

export const consultarTodosEstudiantesFachada = async () => {
  return await consultarTodosEstudiantes();
};