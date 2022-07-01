<template>
  <section v-if="dataset && dataset.length > 0">
    <div class="tbl-header">
      <table cellpadding="0" cellspacing="0" border="0">
        <thead>
          <tr>
            <th>Turma</th>
            <th>Nota</th>
            <th>Aluno</th>
            <th>Curso</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="tbl-content">
      <table cellpadding="0" cellspacing="0" border="0">
        <tbody>
          <tr v-for="diario in dataset" :key="diario.id">
            <td>{{diario.nome_turma}}</td>
            <td>{{diario.nota_aluno}}</td>
            <td>{{diario.student}}</td>
            <td>{{diario.curso}}</td>
            <td>
              <button class="editButton" @click="tableEditClick(diario)">Edit</button>
              <button class="deleteButton" @click="tableRemoveClick(diario)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <div v-else>
    <br/>
    <h2>Ops, no data found :(</h2>
  </div>
</template>

<script>
export default {
  name: "TableComponent",
  props: {dataset: Array},
  emits: ["tableEditClick","tableRemoveClick"],
  setup(props, {emit}){
    function tableEditClick(student){
      emit("tableEditClick", student)
    }

    function tableRemoveClick(student){
      emit("tableRemoveClick", student)
    }

    return {tableEditClick, tableRemoveClick}
  }

}
</script>

<style src="../assets/table.css"/>