<template>
  <section v-if="dataset && dataset.length > 0">
    <div class="tbl-header">
      <table cellpadding="0" cellspacing="0" border="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="tbl-content">
      <table cellpadding="0" cellspacing="0" border="0">
        <tbody>
          <tr v-for="student in dataset" :key="student.id">
            <td>{{student.name}}</td>
            <td>{{student.course}}</td>
            <td>{{student.rating}}</td>
            <td>
              <button class="editButton" @click="tableEditClick(student)">Edit</button>
              <button class="deleteButton" @click="tableRemoveClick(student)">Delete</button>
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