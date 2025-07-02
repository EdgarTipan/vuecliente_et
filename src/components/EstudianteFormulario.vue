<template>
  <div class="container">
    <label for="id_consulta">
      Ingrese el ID del estudiante que desea consultar:
    </label>
    <input v-model="idEstudiante" id="id_consulta" type="number" />
    <button v-on:click="consultarEstudiante(idEstudiante)">Consultar</button>
  </div>

  <div v-if="estudiante" class="container">
    <h2>Resultados de la consulta:</h2>

    <label>ID:</label>
    <input type="text" :value="estudiante.id" readonly />

    <label>Nombre:</label>
    <input type="text" :value="estudiante.nombre" readonly />

    <label>Apellido:</label>
    <input type="text" :value="estudiante.apellido" readonly />

    <label>Fecha de nacimiento:</label>
    <input
      type="date"
      :value="formatearFecha(estudiante.fechaNacimiento)"
      readonly
    />
  </div>
</template>

<script>
import { consultarEstudianteFachada } from "@/clients/EstudianteClient.js";
export default {
  data() {
    return {
      idEstudiante: null,
      estudiante: null,
    };
  },
  methods: {
    async consultarEstudiante(id) {
      try {
        const respuesta = await consultarEstudianteFachada(id);
        console.log("Respuesta del estudiante:", respuesta);
        this.estudiante = respuesta;
      } catch (error) {
        console.error("Error al consultar estudiante:", error);
      }
    },
    formatearFecha(fechaISO) {
      return fechaISO ? fechaISO.split("T")[0] : "";
    },
  },
};
</script>

<style scoped>
.container {
  background: #313943;
  border: 1px solid;
  border-radius: 12px;
  max-width: 1000px;
  margin: 50px auto;
  padding: 30px;
}

label {
  display: block;
  color: #fff;
  text-align: left;
  font-weight: bold;
}

input {
  background: #2a3440;
  color: #fff;
  width: 80%;
  margin-bottom: 20px;
  margin-top: 10px;
  border: none;
  border-bottom: 1px solid #ddd;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 10px 15px;
}

input:focus {
  outline: none;
}

h2 {
    color: #fff;
    font-style: italic;
}

button {
  background: #47596a;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  width: 200px;
  font-weight: bold;
}
</style>