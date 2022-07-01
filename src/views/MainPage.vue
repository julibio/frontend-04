<template>
  <div class="container">
    <section class="structure">
      <div>
        <h1>Students Database</h1>
        <br />
      </div>
      <div>
        <form>
          <input v-model="formData.name" placeholder="Student Name"/>
          <input v-model="formData.course" placeholder="Course"/>
          <input v-model="formData.rating" placeholder="Rating"/>
          <button 
          v-if="!editMode"
          @click.prevent="addStudent()"
          :disabled="!formData.name || !formData.course || !formData.rating"
          >Add</button>
          <button
          v-if="!editMode"
          @click.prevent="reset"
          :disabled="!formData.name && !formData.course && !formData.rating"
          class="resetButton"
          >
          Reset
          </button>
          <button v-if="editMode" @click.prevent="saveModifiedStudent">Save</button>
          <button v-if="editMode" class="resetButton" @click.prevent="cancel">Cancel</button>
        </form>
      </div>
      <div>
        <TableComponent :dataset="dataset" @tableEditClick="editStudent" @tableRemoveClick="deleteStudent"/>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import TableComponent from '../components/TableComponent.vue';
import Services from "../services/services"

export default {
  name: "MainPage",
  components: {
    TableComponent
  },
  setup() {
    const dataset = ref()

    async function loadDataBase(){
      try{
        let req = await Services.getStudents()
        if (req){
          dataset.value = req
          cancel()
        }
      }
      catch(error){
        console.log(error)
      }
    }

    loadDataBase()

    const formData = ref({id: "", name: "", course: "", rating: ""})
    const editMode = ref(false)

    function reset(){
      formData.value.name = ""
      formData.value.course = ""
      formData.value.rating = ""
      formData.value.id = ""
    }

    function cancel(){
      reset()
      editMode.value = false
    }

    async function addStudent(){
      console.log("clicou para adicionar")
      try{
        let req = await Services.addStudent(formData.value.name,formData.value.course,formData.value.rating)
        if(req){
          await loadDataBase()
          editMode.value = false
        }
      }catch(error){console.log(error)}
    }

    function editStudent(student){
      editMode.value = true
      formData.value.name = student.name
      formData.value.course = student.course
      formData.value.rating = student.rating
      formData.value.id = student.id
    }

    async function saveModifiedStudent(){
      try{
        let req = await Services.editStudent(
          formData.value.id,
          formData.value.name,
          formData.value.course,
          formData.value.rating
        )
        if(req) await loadDataBase()

      }catch(error){
        console.log(error)
      }
    }

    async function deleteStudent(student){
      try{
        await Services.deleteStudent(student.id)
      }catch(error){
        console.log(error)
      }
      await loadDataBase()
    }

    return {
      dataset,
      formData,
      editMode,
      reset,
      cancel,
      addStudent,
      editStudent,
      saveModifiedStudent,
      deleteStudent
    }
  },
};
</script>

<style>
</style>