<template>
  <div class="container">
    <button @click="consultarEstudiantes">Consultar Estudiantes</button>
    <table v-if="estudiantes.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Fecha de Nacimiento</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="est in estudiantes" :key="est.id">
          <td>{{ est.id }}</td>
          <td>{{ est.nombre }}</td>
          <td>{{ est.apellido }}</td>
          <td>{{ formatearFecha(est.fechaNacimiento) }}</td>
        </tr>
      </tbody>
    </table>

    <span v-if="!estudiantes.length && yaConsultado">
      No se encontraron estudiantes.
    </span>
  </div>
</template>

<script>
import { consultarTodosEstudiantesFachada } from "@/clients/EstudianteClient.js";

export default {
  data() {
    return {
      estudiantes: [],
      yaConsultado: false,
    };
  },
  methods: {
    async consultarEstudiantes() {
      try {
        const respuesta = await consultarTodosEstudiantesFachada();
        this.estudiantes = respuesta;
        this.yaConsultado = true;
        console.log("Estudiantes:", respuesta);
      } catch (error) {
        console.error("Error al consultar estudiantes:", error);
        this.yaConsultado = true;
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

button {
  background: #47596a;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  width: 200px;
  font-weight: bold;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #2c3845;
  display: table;
  margin-top: 25px;
}

thead {
  display: table-header-group;
}

tr {
  display: table-row;
}

td,
th {
  display: table-cell;
  padding: 10px;
  text-align: left;
  border: 1px solid #374454;
}

th {
  font-weight: 700;
  background-color: #283340;
  border: 1px solid #283340;
  text-align: center;
  color: #fff;
}

td {
  font-style: italic;
  color: #ddd;
}

tr:nth-child(even) td {
  background-color: #2a3440;
}

span {
  color: #fff;
}
</style>
