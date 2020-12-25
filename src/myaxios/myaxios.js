import axios from "axios"
let myaxios = axios.create({
    baseURL: "http://rap2api.taobao.org/app/mock/273673/admin"
})
myaxios.interceptors.response.use(
    function(response){
        return response.data
    },
    function(err){
        return Promise.reject(err)
    }
)
export default  myaxios
