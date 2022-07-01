<template>
  <section v-if="dataset && dataset.length > 0">
    <div class="tbl-header">
      <table cellpadding="0" cellspacing="0" border="0">
        <thead>
          <tr>
            <th>Curso</th>
            <th>Carga Horária</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="tbl-content">
      <table cellpadding="0" cellspacing="0" border="0">
        <tbody>
          <tr v-for="curso in dataset" :key="curso.id">
            <td>{{curso.nome_curso}}</td>
            <td>{{curso.ch_curso}}</td>
            <td>
              <button class="editButton" @click="tableEditClick(curso)">Edit</button>
              <button class="deleteButton" @click="tableRemoveClick(curso)">Delete</button>
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