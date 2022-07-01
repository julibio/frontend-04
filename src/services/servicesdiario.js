import axios from "axios"

const http = axios.create({
    baseURL: "http://localhost:8000"
})


export default {
    async getDiarios(){
        let ret = await http.get("api/diario/")
        return ret.data
    },

    async addDiario(turma,nota,aluno,curso){
        let ret = await http.post("api/diario/",{
            nome_turma: turma,
            nota_aluno: nota,
            student: aluno,
            curso: curso
        })
        return ret.data
    },

    async editDiario(turma,nota,aluno,curso,id){
        let ret = await http.put(`api/diario/${id}/`, {
            nome_turma: turma,
            nota_aluno: nota,
            student: aluno,
            curso: curso
        })
        return ret.data
    },

    async deleteDiario(id){
        let ret = await http.delete(`api/diario/${id}`)
        return ret.data
    }


}