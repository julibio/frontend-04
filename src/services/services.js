import axios from "axios"

const http = axios.create({
    baseURL: "http://localhost:8000"
})


export default {
    async getStudents(){
        let ret = await http.get("api/students/")
        return ret.data
    },

    async addStudent(name,course,rating){
        let ret = await http.post("api/students/",{
            name: name,
            course: course,
            rating: rating,
            matricula: "1"
        })
        return ret.data
    },

    async editStudent(id, name, course, rating){
        let ret = await http.put(`api/students/${id}/`, {
            name: name,
            course: course,
            rating: rating
        })
        return ret.data
    },

    async deleteStudent(id){
        let ret = await http.delete(`api/students/${id}`)
        return ret.data
    }


}