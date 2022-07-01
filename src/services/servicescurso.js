import axios from "axios"

const http = axios.create({
    baseURL: "http://localhost:8000"
})


export default {
    async getCursos(){
        let ret = await http.get("api/cursos/")
        return ret.data
    },

    async addCurso(name,course){
        let ret = await http.post("api/cursos/",{
            nome_curso: name,
            ch_curso: course,
        })
        return ret.data
    },

    async editCurso(id, name, course){
        let ret = await http.put(`api/cursos/${id}/`, {
            nome_curso: name,
            ch_curso: course,
        })
        return ret.data
    },

    async deleteCurso(id){
        let ret = await http.delete(`api/cursos/${id}`)
        return ret.data
    }


}