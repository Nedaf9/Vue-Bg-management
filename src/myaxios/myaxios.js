import axios from "axios"
let myaxios = axios.create({
<<<<<<< HEAD
    baseURL: "http://rap2api.taobao.org/app/mock/274116/"
=======
    baseURL: "http://rap2api.taobao.org/app/mock/273673/admin"
>>>>>>> 516cae988210bfeb52a51a0f381c6f19f558c7d1
})
myaxios.interceptors.response.use(
    function(response){
        return response.data
    },
    function(err){
        return Promise.reject(err)
    }
)
<<<<<<< HEAD
export default  myaxios
=======
export default  myaxios

>>>>>>> 516cae988210bfeb52a51a0f381c6f19f558c7d1
