<template>
  <div class="container">
    <section class="structure">
      <div>
        <h1>Diário</h1>
        <br />
      </div>
      <div>
        <form>
          <input v-model="formData.nome_turma" placeholder="Turma"/>
          <input v-model="formData.nota_aluno" placeholder="Nota"/>
          <select v-model="formData.student">
            <option v-for="item in alunos" :value="item.name" :key="item.id">{{item.name}}</option>
            </select>
          <select v-model="formData.curso">
            <option v-for="item in cursos" :value="item.nome_curso" :key="item.id">{{item.nome_curso}}</option>
            </select>
          <button 
          v-if="!editMode"
          @click.prevent="addDiario()"
          :disabled="!formData.nome_turma || !formData.nota_aluno || !formData.student || !formData.curso"
          >Add</button>
          <button
          v-if="!editMode"
          @click.prevent="reset"
          :disabled="!formData.nome_turma && !formData.nota_aluno && !formData.student && !formData.curso"
          class="resetButton"
          >
          Reset
          </button>
          <button v-if="editMode" @click.prevent="saveModifiedDiario">Save</button>
          <button v-if="editMode" class="resetButton" @click.prevent="cancel">Cancel</button>
        </form>
      </div>
      <div>
        <TableComponent :dataset="dataset" @tableEditClick="editDiario" @tableRemoveClick="deleteDiario"/>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import TableComponent from '../components/TableDiario.vue';
import Services from "../services/servicesdiario"
import Alunos from "../services/services"
import Cursos from "../services/servicescurso"

export default {
  name: "PaginaDiario",
  components: {
    TableComponent
  },
  setup() {
    const dataset = ref()
    const alunos = ref()
    const cursos = ref()

    async function loadDataBase(){
      try{
        let req = await Services.getDiarios()
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

    async function loadAlunos(){
      try{
        let req = await Alunos.getStudents()
        if (req){
          alunos.value = req
          cancel()
        }
      }
      catch(error){
        console.log(error)
      }
    }

    loadAlunos()


    async function loadCursos(){
      try{
        let req = await Cursos.getCursos()
        if (req){
          cursos.value = req
          cancel()
        }
      }
      catch(error){
        console.log(error)
      }
    }

    loadCursos()

    const formData = ref({id: "", nome_turma: "", nota_aluno: "", student: "", curso: ""})
    const editMode = ref(false)

    function reset(){
      formData.value.nome_turma = ""
      formData.value.nota_aluno = ""
      formData.value.student = ""
      formData.value.curso = ""
      formData.value.id = ""
    }

    function cancel(){
      reset()
      editMode.value = false
    }

    async function addDiario(){
      console.log("clicou para adicionar")
      try{
        let req = await Services.addDiario(formData.value.nome_turma,formData.value.nota_aluno,formData.value.student, formData.value.curso)
        if(req){
          await loadDataBase()
          editMode.value = false
        }
      }catch(error){console.log(error)}
    }

    function editDiario(diario){
      editMode.value = true
      formData.value.nome_turma = diario.nome_turma
      formData.value.nota_aluno = diario.nota_aluno
      formData.value.student = diario.student
      formData.value.curso = diario.curso
      formData.value.id = diario.id
    }

    async function saveModifiedDiario(){
      try{
        let req = await Services.editDiario(
          formData.value.nome_turma,
          formData.value.nota_aluno,
          formData.value.student,
          formData.value.curso,
          formData.value.id
        )
        if(req) await loadDataBase()

      }catch(error){
        console.log(error)
      }
    }

    async function deleteDiario(student){
      try{
        await Services.deleteDiario(student.id)
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
      addDiario,
      editDiario,
      saveModifiedDiario,
      deleteDiario,
      alunos,
      cursos
    }
  },
};
</script>

<style>
</style>