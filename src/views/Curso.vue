<template>
  <div class="container">
    <section class="structure">
      <div>
        <h1>Curso</h1>
        <br />
      </div>
      <div>
        <form>
          <input v-model="formData.nome_curso" placeholder="Nome do Curso"/>
          <input v-model="formData.ch_curso" placeholder="Carga Horária"/>
          <button 
          v-if="!editMode"
          @click.prevent="addCurso()"
          :disabled="!formData.nome_curso || !formData.ch_curso"
          >Add</button>
          <button
          v-if="!editMode"
          @click.prevent="reset"
          :disabled="!formData.nome_curso && !formData.ch_curso"
          class="resetButton"
          >
          Reset
          </button>
          <button v-if="editMode" @click.prevent="saveModifiedCurso">Save</button>
          <button v-if="editMode" class="resetButton" @click.prevent="cancel">Cancel</button>
        </form>
      </div>
      <div>
        <TableComponent :dataset="dataset" @tableEditClick="editCurso" @tableRemoveClick="deleteCurso"/>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import TableComponent from '../components/TableCurso.vue';
import Services from "../services/servicescurso"

export default {
  name: "PaginaCurso",
  components: {
    TableComponent
  },
  setup() {
    const dataset = ref()

    async function loadDataBase(){
      try{
        let req = await Services.getCursos()
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

    const formData = ref({id: "", nome_curso: "", ch_curso: ""})
    const editMode = ref(false)

    function reset(){
      formData.value.nome_curso = ""
      formData.value.ch_curso = ""
      formData.value.id = ""
    }

    function cancel(){
      reset()
      editMode.value = false
    }

    async function addCurso(){
      console.log("clicou para adicionar")
      try{
        let req = await Services.addCurso(formData.value.nome_curso,formData.value.ch_curso)
        if(req){
          await loadDataBase()
          editMode.value = false
        }
      }catch(error){console.log(error)}
    }

    function editCurso(curso){
      console.log("editar", curso)
      editMode.value = true
      formData.value.nome_curso = curso.nome_curso
      formData.value.ch_curso = curso.ch_curso
      formData.value.id = curso.id
    }

    async function saveModifiedCurso(){
      try{
        let req = await Services.editCurso(
          formData.value.id,
          formData.value.nome_curso,
          formData.value.ch_curso
        )
        if(req) await loadDataBase()

      }catch(error){
        console.log(error)
      }
    }

    async function deleteCurso(student){
      console.log("deletar", student)
      try{
        await Services.deleteCurso(student.id)
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
      addCurso,
      editCurso,
      saveModifiedCurso,
      deleteCurso
    }
  },
};
</script>

<style>
</style>